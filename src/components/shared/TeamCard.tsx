"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function TeamCard({
  name,
  role,
  description,
  image,
  size = "md",
  className,
}: {
  name: string;
  role?: string;
  description?: string;
  image: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const ring =
    size === "lg" ? "h-40 w-40 sm:h-48 sm:w-48" : size === "md" ? "h-28 w-28" : "h-24 w-24";

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={cn(
        "group flex h-full flex-col items-center rounded-3xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-glow",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden rounded-full ring-2 ring-border transition-all duration-300 group-hover:ring-primary", ring)}>
        <img
          src={image}
          alt={`${name}${role ? `, ${role}` : ""}`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className={cn("mt-5 font-bold", size === "lg" ? "text-2xl" : "text-lg")}>{name}</h3>
      {role && <p className="mt-1 text-sm font-medium text-primary">{role}</p>}
      {description && (
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}
