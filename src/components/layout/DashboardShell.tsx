"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Sparkles, Menu, X, LogOut, Search, Bell } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type NavItem = { label: string; icon: LucideIcon; key: string; href?: string };

export function DashboardShell({
  title,
  items,
  active,
  onSelect,
  children,
}: {
  title: string;
  items: NavItem[];
  active: string;
  onSelect: (key: string) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card/50 backdrop-blur-xl transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b border-border px-5">
          <Link href="/" className="group flex items-center">
            <span className="relative h-14 w-52">
              <Image src="/quickshotlylogo.PNG" alt="Quick Shotly" fill className="object-contain object-left" />
            </span>
          </Link>
        </div>
        <nav className="grid gap-1 p-3">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => {
                onSelect(it.key);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                active === it.key
                  ? "bg-primary text-primary-foreground shadow-glow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <it.icon className="h-4 w-4" /> {it.label}
            </button>
          ))}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-border p-3">
          <Link
            href={isAdmin ? "/dashboard" : "/admin"}
            className="mb-1 flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs text-muted-foreground hover:bg-secondary"
          >
            Switch to {isAdmin ? "Client" : "Admin"}
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Link>
        </div>
      </aside>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-background/70 lg:hidden" />}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full glass lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold">{title}</h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search…"
                className="w-48 rounded-full border border-input bg-input py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <button className="relative grid h-10 w-10 place-items-center rounded-full glass">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">
              Q
            </span>
          </div>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
      {sub && <p className="mt-1 text-xs text-success">{sub}</p>}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending: "bg-warning/15 text-warning",
    Editing: "bg-primary/15 text-primary",
    Rendering: "bg-chart-4/15 text-chart-4",
    "Quality Check": "bg-chart-3/15 text-chart-3",
    Delivered: "bg-success/15 text-success",
    Paid: "bg-success/15 text-success",
    Failed: "bg-destructive/15 text-destructive",
  };
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", map[status] ?? "bg-secondary")}>
      {status}
    </span>
  );
}
