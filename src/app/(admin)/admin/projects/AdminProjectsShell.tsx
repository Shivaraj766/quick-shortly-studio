"use client";

import { DashboardShell, type NavItem } from "@/components/layout/DashboardShell";
import { LayoutDashboard, Users, Calendar, CreditCard, Briefcase, Star, Image, Bell, BarChart3, FolderKanban } from "lucide-react";
import { useRouter } from "next/navigation";

const NAV: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, key: "overview", href: "/admin" },
  { label: "Project Requests", icon: FolderKanban, key: "projects", href: "/admin/projects" },
  { label: "Users", icon: Users, key: "users", href: "/admin" },
  { label: "Bookings", icon: Calendar, key: "bookings", href: "/admin" },
  { label: "Payments", icon: CreditCard, key: "payments", href: "/admin" },
  { label: "Careers", icon: Briefcase, key: "careers", href: "/admin" },
  { label: "Feedback", icon: Star, key: "feedback", href: "/admin" },
  { label: "Portfolio", icon: Image, key: "portfolio", href: "/admin" },
  { label: "Notifications", icon: Bell, key: "notifications", href: "/admin" },
  { label: "Analytics", icon: BarChart3, key: "analytics", href: "/admin" },
];

export function AdminProjectsShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <DashboardShell 
      title="Project Requests" 
      items={NAV} 
      active="projects" 
      onSelect={(key) => {
        const item = NAV.find(n => n.key === key);
        if (item?.href) router.push(item.href);
      }}
    >
      {children}
    </DashboardShell>
  );
}
