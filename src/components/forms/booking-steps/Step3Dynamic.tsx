import { useFormContext } from "react-hook-form";
import { BookingFormData } from "@/lib/validations/booking";

export function Step3Dynamic() {
  const { register, watch, setValue } = useFormContext<BookingFormData>();
  const service = watch("service");
  
  // Helper to safely get/set dynamic answers
  const dynamicAnswers = watch("dynamic_service_answers") || {};
  const setAnswer = (key: string, value: any) => {
    setValue("dynamic_service_answers", { ...dynamicAnswers, [key]: value }, { shouldValidate: true });
  };

  if (!service) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Please select a service first.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold mb-2">{service} Details</h2>
        <p className="text-muted-foreground">Help us understand the specifics of your requirement.</p>
      </div>

      {service === "Video Editing" && (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Content Type</label>
            <div className="flex flex-wrap gap-3">
              {["YouTube", "Podcast", "Documentary", "Instagram", "Advertisement", "Other"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAnswer("contentType", t)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    dynamicAnswers.contentType === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Average Video Length</label>
            <div className="flex flex-wrap gap-3">
              {["Under 5 Minutes", "5–10 Minutes", "10–20 Minutes", "20+ Minutes"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAnswer("videoLength", t)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    dynamicAnswers.videoLength === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-sm font-medium">Project Type</label>
              <select 
                onChange={(e) => setAnswer("projectType", e.target.value)}
                value={dynamicAnswers.projectType || ""}
                className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary"
              >
                <option value="" disabled>Select type...</option>
                <option value="One-Time">One-Time</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Do you already have footage?</label>
              <div className="flex gap-4">
                {["Yes", "No"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAnswer("hasFootage", t)}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                      dynamicAnswers.hasFootage === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {dynamicAnswers.hasFootage === "No" && (
            <div className="space-y-3 animate-in fade-in zoom-in duration-300">
              <label className="text-sm font-medium text-orange-400">Need a shoot?</label>
              <div className="flex gap-4">
                {["Yes", "No"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAnswer("needShoot", t)}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                      dynamicAnswers.needShoot === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Features Required</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Motion Graphics", "Color Grading", "Sound Design", "Subtitles", "Thumbnail Design", "VFX", "Intro Animation"].map((t) => {
                const isSelected = (dynamicAnswers.features || []).includes(t);
                return (
                  <label key={t} className="flex items-center gap-2 cursor-pointer rounded-xl border border-border p-3 hover:bg-muted transition-colors">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={(e) => {
                        const current = dynamicAnswers.features || [];
                        if (e.target.checked) setAnswer("features", [...current, t]);
                        else setAnswer("features", current.filter((f: string) => f !== t));
                      }}
                      className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-sm">{t}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {service === "Wedding Films" && (
        <div className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bride's Name</label>
              <input 
                onChange={(e) => setAnswer("brideName", e.target.value)}
                value={dynamicAnswers.brideName || ""}
                placeholder="Bride"
                className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Groom's Name</label>
              <input 
                onChange={(e) => setAnswer("groomName", e.target.value)}
                value={dynamicAnswers.groomName || ""}
                placeholder="Groom"
                className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Wedding Date</label>
              <input 
                type="date"
                onChange={(e) => setAnswer("date", e.target.value)}
                value={dynamicAnswers.date || ""}
                className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <input 
                onChange={(e) => setAnswer("location", e.target.value)}
                value={dynamicAnswers.location || ""}
                placeholder="City, Venue"
                className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Events to Cover</label>
            <div className="flex flex-wrap gap-3">
              {["Engagement", "Haldi", "Mehendi", "Wedding", "Reception"].map((t) => {
                const isSelected = (dynamicAnswers.events || []).includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      const current = dynamicAnswers.events || [];
                      if (!isSelected) setAnswer("events", [...current, t]);
                      else setAnswer("events", current.filter((f: string) => f !== t));
                    }}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      isSelected ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Estimated Guests</label>
            <div className="flex flex-wrap gap-3">
              {["Under 100", "100–300", "300–700", "700+"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAnswer("guests", t)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    dynamicAnswers.guests === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {service === "Commercial Shoot" && (
        <div className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Name</label>
              <input 
                onChange={(e) => setAnswer("businessName", e.target.value)}
                value={dynamicAnswers.businessName || ""}
                className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <input 
                onChange={(e) => setAnswer("industry", e.target.value)}
                value={dynamicAnswers.industry || ""}
                className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">What are you promoting?</label>
            <div className="flex flex-wrap gap-3">
              {["Product", "Service", "App", "Website", "Brand"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAnswer("promoting", t)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    dynamicAnswers.promoting === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="space-y-3">
              <label className="text-sm font-medium">Need Models?</label>
              <div className="flex gap-2">
                {["Yes", "No"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAnswer("models", t)}
                    className={`flex-1 rounded-2xl border px-3 py-2 text-sm transition-colors ${
                      dynamicAnswers.models === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium">Need Studio?</label>
              <div className="flex gap-2">
                {["Yes", "No"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAnswer("studio", t)}
                    className={`flex-1 rounded-2xl border px-3 py-2 text-sm transition-colors ${
                      dynamicAnswers.studio === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium">Shoot Days</label>
              <div className="flex gap-2">
                {["1", "2", "3+"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAnswer("shootDays", t)}
                    className={`flex-1 rounded-2xl border px-3 py-2 text-sm transition-colors ${
                      dynamicAnswers.shootDays === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {service === "Instagram Reels" && (
        <div className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Business / Creator Type</label>
              <input 
                onChange={(e) => setAnswer("businessType", e.target.value)}
                value={dynamicAnswers.businessType || ""}
                className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">How many reels per month?</label>
              <input 
                type="number"
                onChange={(e) => setAnswer("reelsCount", e.target.value)}
                value={dynamicAnswers.reelsCount || ""}
                className="w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { id: "script", label: "Need Script Writing?" },
              { id: "voiceOver", label: "Need Voice Over?" },
              { id: "shooting", label: "Need Shooting?" },
            ].map((q) => (
              <div key={q.id} className="space-y-3">
                <label className="text-sm font-medium">{q.label}</label>
                <div className="flex gap-2">
                  {["Yes", "No"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setAnswer(q.id, t)}
                      className={`flex-1 rounded-2xl border px-3 py-2 text-sm transition-colors ${
                        dynamicAnswers[q.id] === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback for Custom Project or others that don't have explicit dynamic fields */}
      {!["Video Editing", "Wedding Films", "Commercial Shoot", "Instagram Reels"].includes(service) && (
        <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center text-muted-foreground">
          No specific questions for this service. Let's move on to the creative brief!
        </div>
      )}
    </div>
  );
}
