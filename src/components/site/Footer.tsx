import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail, Phone } from "lucide-react";
import { NAV_LINKS, BRAND, SERVICES } from "@/lib/site-data";
import logo from "@/assets/quickshotly-bolt.png";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2">

            <span className="grid h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 place-items-center rounded-xl bg-primary/10 p-1.5">
              <img src={logo} alt="Quick Shortly logo" className="h-full w-auto" />
            </span>
            <span className="text-base font-bold">Quick Shortly</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{BRAND.tagline}</p>
          <div className="mt-5 flex gap-3">
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full glass glow-hover">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={BRAND.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full glass glow-hover">
              <Youtube className="h-4 w-4" />
            </a>
            <a href={`mailto:${BRAND.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full glass glow-hover">
              <Mail className="h-4 w-4" />
            </a>
            <a href={`tel:${BRAND.phone}`} aria-label="Phone" className="grid h-10 w-10 place-items-center rounded-full glass glow-hover">
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Navigate</h4>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Services</h4>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Get in touch</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>{BRAND.email}</li>
            <li>{BRAND.phone}</li>
            <li>{BRAND.phone2}</li>
            <li>Mon–Sat · 10am – 8pm IST</li>
          </ul>
          <Link
            to="/booking"
            className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow"
          >
            Start a project
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Quick Shortly. All rights reserved.</p>
          <p>Shoot on iPhone. Edit Like Cinema.</p>
        </div>
      </div>
    </footer>
  );
}
