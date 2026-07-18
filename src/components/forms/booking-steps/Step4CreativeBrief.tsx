import { useFormContext } from "react-hook-form";
import { BookingFormData } from "@/lib/validations/booking";

export function Step4CreativeBrief() {
  const { register } = useFormContext<BookingFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Creative Brief</h2>
        <p className="text-muted-foreground">Let's dive into the vision of your project.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Title</label>
          <input 
            {...register("title")}
            placeholder="e.g., Summer Collection Launch Video"
            className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Describe your project</label>
          <textarea 
            {...register("description")}
            rows={3}
            placeholder="Tell us what you have in mind..."
            className="w-full resize-none rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">What is the main goal?</label>
          <input 
            {...register("goal")}
            placeholder="e.g., Increase sales, build brand awareness, tell a story"
            className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Who is your audience?</label>
          <input 
            {...register("audience")}
            placeholder="e.g., Gen Z fashion enthusiasts, Corporate executives"
            className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">What emotion should the final video create?</label>
          <input 
            {...register("emotion")}
            placeholder="e.g., Excitement, Trust, Nostalgia, Hype"
            className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
