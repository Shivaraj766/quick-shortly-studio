import { useFormContext } from "react-hook-form";
import { BookingFormData } from "@/lib/validations/booking";

export function Step1Personal() {
  const { register, formState: { errors } } = useFormContext<BookingFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
        <p className="text-muted-foreground">Let's start with the basics so we can get back to you.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
          <input 
            {...register("full_name")}
            placeholder="John Doe"
            className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-all"
          />
          {errors.full_name && <p className="text-xs text-red-500">{errors.full_name.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address <span className="text-red-500">*</span></label>
          <input 
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-all"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message as string}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Phone Number <span className="text-red-500">*</span></label>
          <input 
            type="tel"
            {...register("phone")}
            placeholder="+1 234 567 8900"
            className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-all"
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Company Name <span className="text-muted-foreground font-normal">(Optional)</span></label>
          <input 
            {...register("company_name")}
            placeholder="Your Brand Ltd."
            className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Instagram / Website <span className="text-muted-foreground font-normal">(Optional)</span></label>
          <input 
            {...register("social_links")}
            placeholder="@yourbrand or yourbrand.com"
            className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
