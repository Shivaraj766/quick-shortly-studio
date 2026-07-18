import { useFormContext } from "react-hook-form";
import { BookingFormData } from "@/lib/validations/booking";
import { Film, Video, Camera, Briefcase, Smartphone, MonitorPlay, Sparkles } from "lucide-react";

const SERVICES = [
  { id: "Video Editing", icon: Film, description: "Professional post-production" },
  { id: "Wedding Films", icon: Sparkles, description: "Cinematic memories" },
  { id: "Commercial Shoot", icon: Video, description: "High-end advertisements" },
  { id: "Product Photography", icon: Camera, description: "E-commerce & lifestyle" },
  { id: "Brand Content", icon: Briefcase, description: "Social media assets" },
  { id: "Instagram Reels", icon: Smartphone, description: "Short-form vertical video" },
  { id: "YouTube Editing", icon: MonitorPlay, description: "Engaging long-form content" },
  { id: "Custom Project", icon: Sparkles, description: "Something unique" },
];

export function Step2Service() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<BookingFormData>();
  const currentService = watch("service");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose Your Service</h2>
        <p className="text-muted-foreground">What kind of project are we working on?</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => {
          const isSelected = currentService === s.id;
          return (
            <div
              key={s.id}
              onClick={() => setValue("service", s.id as any, { shouldValidate: true })}
              className={`relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                isSelected 
                  ? "border-primary bg-primary/10 shadow-glow-sm" 
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted"
              }`}
            >
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted-foreground/10 text-muted-foreground"}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{s.id}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.description}</p>
              
              {isSelected && (
                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Hidden input to register the field for validation */}
      <input type="hidden" {...register("service")} />
      
      {errors.service && <p className="text-sm text-red-500 mt-2">{errors.service.message as string}</p>}
    </div>
  );
}
