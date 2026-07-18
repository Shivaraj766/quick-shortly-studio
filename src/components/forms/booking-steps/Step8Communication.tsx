import { useFormContext } from "react-hook-form";
import { BookingFormData } from "@/lib/validations/booking";
import { MessageSquare, PhoneCall, Video, Mail } from "lucide-react";

const METHODS = [
  { id: "Website Chat", icon: MessageSquare },
  { id: "WhatsApp", icon: PhoneCall },
  { id: "Phone Call", icon: PhoneCall },
  { id: "Google Meet", icon: Video },
];

const TIMES = ["Morning", "Afternoon", "Evening"];

export function Step8Communication() {
  const { watch, setValue } = useFormContext<BookingFormData>();
  
  const currentMethod = watch("communication_method");
  const currentTime = watch("communication_time");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Communication</h2>
        <p className="text-muted-foreground">How and when should we reach out to you?</p>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Preferred Communication Method</label>
        <div className="grid gap-4 sm:grid-cols-2">
          {METHODS.map((m) => {
            const isSelected = currentMethod === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setValue("communication_method", m.id, { shouldValidate: true })}
                className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
                  isSelected 
                    ? "border-primary bg-primary/10 shadow-glow-sm" 
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <m.icon className="h-5 w-5" />
                </div>
                <span className="font-semibold">{m.id}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Best Time to Connect</label>
        <div className="flex flex-wrap gap-3">
          {TIMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setValue("communication_time", t, { shouldValidate: true })}
              className={`rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 ${
                currentTime === t 
                  ? "bg-primary text-primary-foreground border-primary shadow-glow-sm" 
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
