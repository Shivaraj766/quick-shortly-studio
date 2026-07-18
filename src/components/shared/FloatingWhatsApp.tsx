"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20Quick%20Shotly!%20I'd%20like%20to%20discuss%20a%20project.`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-success text-background shadow-glow"
    >
      <span className="absolute inset-0 animate-pulse-glow rounded-full bg-success/40 blur-md" />
      <MessageCircle className="relative h-7 w-7" />
    </motion.a>
  );
}
