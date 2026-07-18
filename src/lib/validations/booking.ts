import * as z from "zod";

export const bookingSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  company_name: z.string().optional(),
  social_links: z.string().optional(),

  service: z.enum([
    "Video Editing",
    "Wedding Films",
    "Commercial Shoot",
    "Product Photography",
    "Brand Content",
    "Instagram Reels",
    "YouTube Editing",
    "Custom Project",
  ], { message: "Please select a service" }),

  // Step 3 (Dynamic) - kept flexible in schema, we will validate explicitly where needed
  dynamic_service_answers: z.any().optional(),

  // Step 4
  title: z.string().optional(),
  description: z.string().optional(),
  goal: z.string().optional(),
  audience: z.string().optional(),
  emotion: z.string().optional(),

  // Step 5
  style: z.array(z.string()).optional(),
  
  // Features (from dynamic step mostly)
  features: z.array(z.string()).optional(),

  // Step 6
  deadline: z.string().optional(),
  budget_range: z.string().optional(),

  // Step 7 (References/attachments)
  references: z.array(z.string()).optional(),
  attachments: z.any().optional(), // File array handled separately in component

  // Step 8
  communication_method: z.string().optional(),
  communication_time: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
