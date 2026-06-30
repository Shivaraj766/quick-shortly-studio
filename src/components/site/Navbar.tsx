import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";
import { NAV_LINKS, BRAND } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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
          "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled ? "mt-2 sm:mx-4 sm:rounded-full glass shadow-card" : "bg-transparent",
        )}
      >
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow-sm transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-base font-bold tracking-tight">Quick Shortly</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!text-foreground" }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow"
          >
            Sign Up
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full glass lg:hidden"
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
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "!text-foreground bg-secondary" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                className="rounded-2xl border border-border px-4 py-3 text-center text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
