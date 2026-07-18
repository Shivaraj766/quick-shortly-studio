import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Clock, CheckCircle2, ChevronRight, FileText, Paperclip } from "lucide-react";
import Link from "next/link";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  
  const { data: projects, error } = await supabase
    .from("project_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Error loading projects: {error.message}</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Project Requests</h1>
        <p className="text-muted-foreground">Manage and review incoming booking requests.</p>
      </div>

      <div className="grid gap-4">
        {projects?.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            No project requests yet.
          </div>
        ) : (
          projects?.map((project) => (
            <div key={project.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-primary/50 hover:shadow-glow-sm">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                    {project.project_id}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    project.status === 'PENDING_REVIEW' ? 'bg-yellow-500/10 text-yellow-500' :
                    project.status === 'APPROVED' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'
                  }`}>
                    {project.status.replace("_", " ")}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {format(new Date(project.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Client</p>
                    <p className="font-semibold text-sm">{project.full_name}</p>
                    <p className="text-xs text-muted-foreground">{project.company_name || project.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Service</p>
                    <p className="font-semibold text-sm">{project.service}</p>
                    {project.title && <p className="text-xs text-muted-foreground truncate">{project.title}</p>}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Timeline & Budget</p>
                    <p className="font-semibold text-sm">{project.budget_range || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground">{project.deadline || 'Flexible'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Assets</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                        <span>{project.references?.length || 0}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span>{project.attachments?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link 
                  href={`/admin/projects/${project.project_id}`}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
