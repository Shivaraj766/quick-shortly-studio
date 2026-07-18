"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, LogOut, UserCircle } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/app/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();
    
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setIsLoggedIn(!!session);
        setIsAdmin(session?.user?.email === "shivarajsing13@gmail.com");
      }
    });

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        setIsLoggedIn(!!session);
        setIsAdmin(session?.user?.email === "shivarajsing13@gmail.com");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        className={cn(
          "mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 transition-all duration-300",
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        )}
      >
        <Link href="/" className="group flex items-center">
          <span className="relative h-20 w-64 sm:h-24 sm:w-80 md:h-28 md:w-96">
            <Image src="/quickshotlylogo.PNG" alt="Quick Shotly" fill className="object-contain object-left" />
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                href={link.to}
                className={cn(
                  "relative text-[13px] font-semibold transition-colors flex flex-col items-center gap-1",
                  isActive ? "text-white" : "text-gray-300 hover:text-white"
                )}
              >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-dot"
                      className="absolute -bottom-3 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                    />
                  )}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="text-[13px] font-semibold text-white transition-colors hover:text-gray-300"
            >
              Login
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                <UserCircle className="h-6 w-6 text-gray-300 transition-colors hover:text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background border-border">
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/projects" className="cursor-pointer">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut().then(() => window.location.href = '/')} className="cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Link
            href="/booking"
            className="group flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.6)] transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.8)]"
          >
            Book Your Shoot <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-2 overflow-hidden rounded-3xl glass p-3 shadow-card lg:hidden"
          >
            <div className="grid gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
                return (
                <Link
                  key={link.to}
                  href={link.to}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
                    isActive ? "text-foreground bg-secondary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
                )
              })}
            </div>
            <div className={`mt-3 grid gap-2 ${isLoggedIn ? (isAdmin ? "grid-cols-2" : "grid-cols-1") : "grid-cols-2"}`}>
              {isAdmin && (
                <Link
                  href="/admin/projects"
                  className="rounded-2xl bg-blue-600/10 border border-blue-500/20 px-4 py-3 text-center text-sm font-semibold text-blue-500 hover:bg-blue-600/20"
                >
                  Admin Panel
                </Link>
              )}
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    className="rounded-2xl border border-border px-4 py-3 text-center text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className={cn(
                      "rounded-2xl border border-border px-4 py-3 text-center text-sm font-medium",
                      isAdmin && "col-span-2"
                    )}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard"
                    className={cn(
                      "rounded-2xl border border-border px-4 py-3 text-center text-sm font-medium",
                      isAdmin && "col-span-2"
                    )}
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => signOut().then(() => window.location.href = '/')}
                    className={cn(
                      "rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-500 hover:bg-red-500/20",
                      isAdmin && "col-span-2"
                    )}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
