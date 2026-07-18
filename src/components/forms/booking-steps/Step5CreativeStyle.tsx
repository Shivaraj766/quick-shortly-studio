import { useFormContext } from "react-hook-form";
import { BookingFormData } from "@/lib/validations/booking";

const STYLES = [
  "Cinematic", "Luxury", "Modern", "Minimal", 
  "Fast Paced", "Storytelling", "Documentary", 
  "Bold", "Elegant", "Dark", "Bright"
];

export function Step5CreativeStyle() {
  const { watch, setValue } = useFormContext<BookingFormData>();
  const currentStyles = watch("style") || [];

  const toggleStyle = (style: string) => {
    if (currentStyles.includes(style)) {
      setValue("style", currentStyles.filter(s => s !== style), { shouldValidate: true });
    } else {
      setValue("style", [...currentStyles, style], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Creative Style</h2>
        <p className="text-muted-foreground">Select the visual styles that match your vision.</p>
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        {STYLES.map((style) => {
          const isSelected = currentStyles.includes(style);
          return (
            <button
              key={style}
              type="button"
              onClick={() => toggleStyle(style)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                isSelected 
                  ? "bg-primary text-primary-foreground border-primary shadow-glow-sm" 
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {style}
            </button>
          );
        })}
      </div>
    </div>
  );
}
