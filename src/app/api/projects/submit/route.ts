import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const formData = await req.formData();

    // 1. Extract files
    const attachmentFiles = formData.getAll("attachments") as File[];
    
    // 2. Extract standard fields
    const fullName = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const companyName = formData.get("company_name") as string || null;
    const socialLinks = formData.get("social_links") as string || null;
    
    const service = formData.get("service") as string;
    
    const title = formData.get("title") as string || null;
    const description = formData.get("description") as string || null;
    const goal = formData.get("goal") as string || null;
    const audience = formData.get("audience") as string || null;
    const emotion = formData.get("emotion") as string || null;
    
    const styleStr = formData.get("style") as string;
    const featuresStr = formData.get("features") as string;
    const style = styleStr ? JSON.parse(styleStr) : [];
    const features = featuresStr ? JSON.parse(featuresStr) : [];
    
    const budgetRange = formData.get("budget_range") as string || null;
    const deadline = formData.get("deadline") as string || null;
    const communicationMethod = formData.get("communication_method") as string || null;
    const communicationTime = formData.get("communication_time") as string || null;
    
    const referencesStr = formData.get("references") as string;
    const references = referencesStr ? JSON.parse(referencesStr) : [];
    
    const dynamicAnswersStr = formData.get("dynamic_service_answers") as string;
    const dynamicServiceAnswers = dynamicAnswersStr ? JSON.parse(dynamicAnswersStr) : {};

    // 3. Upload Attachments
    const attachmentUrls: string[] = [];
    
    for (const file of attachmentFiles) {
      if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("project-attachments")
          .upload(`submissions/${fileName}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Storage Upload Error:", uploadError);
          // Continue with other files even if one fails, or we could throw.
        } else if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from("project-attachments")
            .getPublicUrl(uploadData.path);
          attachmentUrls.push(publicUrl);
        }
      }
    }

    // 4. Generate Project ID
    const currentYear = new Date().getFullYear();
    let nextNum = 1;
    
    // Get the latest project ID for the current year
    const { data: latestProject } = await supabase
      .from("project_requests")
      .select("project_id")
      .like("project_id", `QS-${currentYear}-%`)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (latestProject && latestProject.project_id) {
      const parts = latestProject.project_id.split("-");
      if (parts.length === 3) {
        const lastNum = parseInt(parts[2], 10);
        if (!isNaN(lastNum)) {
          nextNum = lastNum + 1;
        }
      }
    }
    
    const projectId = `QS-${currentYear}-${nextNum.toString().padStart(6, '0')}`;

    // Get user if authenticated (optional)
    const { data: { user } } = await supabase.auth.getUser();

    // 5. Insert Record
    const { data, error } = await supabase
      .from("project_requests")
      .insert({
        project_id: projectId,
        user_id: user?.id || null,
        full_name: fullName,
        email,
        phone,
        company_name: companyName,
        social_links: socialLinks,
        service,
        title,
        description,
        goal,
        audience,
        emotion,
        style,
        features,
        budget_range: budgetRange,
        deadline,
        communication_method: communicationMethod,
        communication_time: communicationTime,
        references,
        attachments: attachmentUrls,
        dynamic_service_answers: dynamicServiceAnswers,
      });

    if (error) {
      console.error("DB Insert Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, projectId: projectId });
  } catch (error: any) {
    console.error("Submission Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
