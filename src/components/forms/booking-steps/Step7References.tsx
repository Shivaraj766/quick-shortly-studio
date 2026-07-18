import { useFormContext } from "react-hook-form";
import { BookingFormData } from "@/lib/validations/booking";
import { useState } from "react";
import { UploadCloud, Link as LinkIcon, X } from "lucide-react";

export function Step7References() {
  const { register, watch, setValue } = useFormContext<BookingFormData>();
  const [linkInput, setLinkInput] = useState("");
  
  const references = watch("references") || [];
  const attachments = watch("attachments");

  const addLink = () => {
    if (linkInput && !references.includes(linkInput)) {
      setValue("references", [...references, linkInput], { shouldValidate: true });
      setLinkInput("");
    }
  };

  const removeLink = (link: string) => {
    setValue("references", references.filter(r => r !== link), { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Upload References</h2>
        <p className="text-muted-foreground">Share mood boards, examples, or brand assets with us.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Add Reference Links</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input 
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLink())}
                placeholder="YouTube, Pinterest, Instagram, Google Drive..."
                className="w-full rounded-2xl border border-input bg-input pl-10 pr-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <button 
              type="button"
              onClick={addLink}
              className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Add
            </button>
          </div>
          
          {references.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {references.map((link) => (
                <div key={link} className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs">
                  <span className="max-w-[200px] truncate">{link}</span>
                  <button type="button" onClick={() => removeLink(link)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Upload Files</label>
          <div className="relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 px-6 py-10 transition-colors hover:border-primary/50 hover:bg-muted/50">
            <input 
              type="file" 
              multiple 
              {...register("attachments")}
              className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
              title="Upload files"
            />
            <UploadCloud className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium">Click or drag files to upload</p>
            <p className="mt-1 text-xs text-muted-foreground">Images, Videos, PDFs up to 50MB</p>
          </div>
          
          {attachments && attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Selected Files:</p>
              <ul className="space-y-1">
                {Array.from(attachments as FileList).map((file, i) => (
                  <li key={i} className="text-sm flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    {file.name} <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
