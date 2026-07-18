import { useFormContext } from "react-hook-form";
import { BookingFormData } from "@/lib/validations/booking";
import { CheckCircle2, Paperclip, FileText } from "lucide-react";

export function Step9Review() {
  const { getValues } = useFormContext<BookingFormData>();
  const data = getValues();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Project Request</h2>
        <p className="text-muted-foreground">Please double check your details before submitting.</p>
      </div>

      <div className="space-y-6">
        
        {/* Project Details */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold border-b border-border pb-2">Project Overview</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Service</p>
              <p className="font-semibold text-primary">{data.service || "Not selected"}</p>
            </div>
            {data.title && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Title</p>
                <p className="font-semibold">{data.title}</p>
              </div>
            )}
            {data.budget_range && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Budget</p>
                <p className="font-semibold">{data.budget_range}</p>
              </div>
            )}
            {data.deadline && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Deadline</p>
                <p className="font-semibold">{data.deadline}</p>
              </div>
            )}
          </div>
        </div>

        {/* Client Details */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold border-b border-border pb-2">Client Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Name</p>
              <p className="font-semibold">{data.full_name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
              <p className="font-semibold">{data.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
              <p className="font-semibold">{data.phone}</p>
            </div>
            {data.company_name && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Company</p>
                <p className="font-semibold">{data.company_name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Attachments */}
        {((data.references && data.references.length > 0) || (data.attachments && data.attachments.length > 0)) && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold border-b border-border pb-2">Attachments & Links</h3>
            <div className="space-y-3">
              {data.references?.map((ref, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-blue-500">
                  <Paperclip className="h-4 w-4" />
                  <a href={ref} target="_blank" rel="noreferrer" className="hover:underline max-w-[300px] truncate">{ref}</a>
                </div>
              ))}
              {data.attachments && Array.from(data.attachments as FileList).map((file, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="font-medium max-w-[300px] truncate">{file.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
