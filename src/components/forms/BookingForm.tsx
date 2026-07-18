"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { bookingSchema, BookingFormData } from "@/lib/validations/booking";

import { Step1Personal } from "./booking-steps/Step1Personal";
import { Step2Service } from "./booking-steps/Step2Service";
import { Step3Dynamic } from "./booking-steps/Step3Dynamic";
import { Step4CreativeBrief } from "./booking-steps/Step4CreativeBrief";
import { Step5CreativeStyle } from "./booking-steps/Step5CreativeStyle";
import { Step6TimelineBudget } from "./booking-steps/Step6TimelineBudget";
import { Step7References } from "./booking-steps/Step7References";
import { Step8Communication } from "./booking-steps/Step8Communication";
import { Step9Review } from "./booking-steps/Step9Review";

const STORAGE_KEY = "qs_booking_draft";
const TOTAL_STEPS = 9;

export function BookingFormContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ projectId: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const searchParams = useSearchParams();
  const urlService = searchParams?.get("service");

  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    defaultValues: {
      style: [],
      features: [],
      references: [],
      dynamic_service_answers: {},
    }
  });

  const { watch, reset, trigger, getValues, setValue } = methods;

  // Load from local storage or URL
  useEffect(() => {
    let hasDraft = false;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.data) {
          reset(parsed.data);
          hasDraft = true;
        }
        if (parsed.step) {
          setCurrentStep(parsed.step);
        }
      } catch (e) {
        console.error("Failed to parse saved form draft", e);
      }
    }
    
    // If no draft exists and there is a service in the URL, pre-select it
    if (!hasDraft && urlService) {
      // Validate that the URL service matches one of the enum options, 
      // or just set it and let Zod handle validation.
      setValue("service", urlService as any);
      // Skip directly to Step 2 if they came from a specific service page?
      // For now, let them start at step 1 (Personal Info) and when they reach step 2 it will be pre-selected.
    }
    
    setIsLoaded(true);
  }, [reset, urlService, setValue]);

  // Save to local storage
  useEffect(() => {
    if (!isLoaded) return;
    const subscription = watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: currentStep, data: value }));
    });
    return () => subscription.unsubscribe();
  }, [watch, currentStep, isLoaded]);

  const nextStep = async () => {
    // Validate current step fields before proceeding
    let fieldsToValidate: (keyof BookingFormData)[] = [];
    if (currentStep === 1) fieldsToValidate = ["full_name", "email", "phone"];
    if (currentStep === 2) fieldsToValidate = ["service"];
    
    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Append standard fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'attachments') return; // handle files separately
        if (value !== undefined && value !== null) {
          if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });

      // Append files
      if (data.attachments && data.attachments.length > 0) {
        Array.from(data.attachments as FileList).forEach((file) => {
          formData.append("attachments", file);
        });
      }

      const res = await fetch("/api/projects/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.error || "Failed to submit project");
      }

      setSuccessData({ projectId: result.projectId });
      localStorage.removeItem(STORAGE_KEY);
      reset();
      
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (successData) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl text-center rounded-[2rem] border border-border bg-card p-12 glow-hover"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="mb-2 text-3xl font-bold">Project Successfully Submitted</h2>
        <p className="mb-8 text-muted-foreground">Your Creative Project Request has been received.</p>
        
        <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-background">
          <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
            <div className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Project ID</p>
              <p className="font-mono font-bold text-lg text-primary">{successData.projectId}</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status</p>
              <p className="font-semibold text-yellow-500">Pending Review</p>
            </div>
          </div>
          <div className="p-4 bg-muted/50 text-left">
            <h4 className="font-semibold mb-3 text-sm">Next Steps</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Our creative producer reviews your request.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> We'll prepare a custom quotation.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> You'll receive a proposal within a few hours.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> After approval, you'll enter your Project Room to track progress.</li>
            </ul>
          </div>
        </div>
        
        <Link href="/" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:shadow-glow-lg">
          Back to Home
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress Bar */}
      <div className="mb-8 flex items-center justify-between">
        <div className="text-sm font-medium text-muted-foreground">
          Step {currentStep} of {TOTAL_STEPS}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 w-8 rounded-full transition-colors ${
                i + 1 <= currentStep ? "bg-primary" : "bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 sm:p-10 shadow-xl glow-hover">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                {currentStep === 1 && <Step1Personal />}
                {currentStep === 2 && <Step2Service />}
                {currentStep === 3 && <Step3Dynamic />}
                {currentStep === 4 && <Step4CreativeBrief />}
                {currentStep === 5 && <Step5CreativeStyle />}
                {currentStep === 6 && <Step6TimelineBudget />}
                {currentStep === 7 && <Step7References />}
                {currentStep === 8 && <Step8Communication />}
                {currentStep === 9 && <Step9Review />}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div /> // Spacer
              )}
              
              {currentStep < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-2.5 text-sm font-bold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Project"
                  )}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export function BookingForm() {
  return (
    <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <BookingFormContent />
    </Suspense>
  );
}
