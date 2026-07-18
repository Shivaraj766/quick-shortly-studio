import { useFormContext } from "react-hook-form";
import { BookingFormData } from "@/lib/validations/booking";

const DEADLINES = [
  "ASAP",
  "Within 1 Week",
  "Within 2 Weeks",
  "Within 1 Month",
  "Flexible"
];

const BUDGETS = [
  "Under ₹10k",
  "₹10k–25k",
  "₹25k–50k",
  "₹50k–1L",
  "₹1L+",
  "Need Recommendation"
];

export function Step6TimelineBudget() {
  const { watch, setValue } = useFormContext<BookingFormData>();
  const deadline = watch("deadline");
  const budget = watch("budget_range");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Timeline & Budget</h2>
        <p className="text-muted-foreground">Help us understand the logistics of your project.</p>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Expected Deadline</label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEADLINES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setValue("deadline", d, { shouldValidate: true })}
              className={`rounded-2xl border px-4 py-4 text-sm font-medium transition-all duration-300 ${
                deadline === d 
                  ? "bg-primary text-primary-foreground border-primary shadow-glow-sm" 
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Expected Budget</label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setValue("budget_range", b, { shouldValidate: true })}
              className={`rounded-2xl border px-4 py-4 text-sm font-medium transition-all duration-300 ${
                budget === b 
                  ? "bg-primary text-primary-foreground border-primary shadow-glow-sm" 
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
