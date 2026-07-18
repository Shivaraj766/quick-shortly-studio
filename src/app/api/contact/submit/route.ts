import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string || null;
    const inquiry_type = formData.get("inquiry_type") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const contact_method = formData.get("contact_method") as string || null;
    const attachmentFile = formData.get("attachment") as File | null;

    if (!name || !email || !inquiry_type || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let attachmentUrl = null;

    // Handle file upload if present
    if (attachmentFile && attachmentFile.size > 0) {
      const fileExt = attachmentFile.name.split('.').pop();
      const fileName = `contact-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("project-attachments")
        .upload(`inquiries/${fileName}`, attachmentFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage Upload Error:", uploadError);
      } else if (uploadData) {
        const { data: { publicUrl } } = supabase.storage
          .from("project-attachments")
          .getPublicUrl(uploadData.path);
        attachmentUrl = publicUrl;
      }
    }

    const { error } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        phone,
        inquiry_type,
        subject,
        message,
        attachment: attachmentUrl,
        contact_method,
      });

    if (error) {
      console.error("DB Insert Error for Contact Message:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact Submission Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
