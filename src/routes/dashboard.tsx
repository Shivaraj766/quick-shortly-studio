import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  Download,
  Bell,
  MessageSquare,
  User,
  Settings,
} from "lucide-react";
import { DashboardShell, StatCard, StatusBadge, type NavItem } from "@/components/dashboard/DashboardShell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Quick Shotly" }] }),
  component: Dashboard,
});

const NAV: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, key: "overview" },
  { label: "My Bookings", icon: Calendar, key: "bookings" },
  { label: "Payment History", icon: CreditCard, key: "payments" },
  { label: "Download Projects", icon: Download, key: "downloads" },
  { label: "Notifications", icon: Bell, key: "notifications" },
  { label: "Messages", icon: MessageSquare, key: "messages" },
  { label: "Profile", icon: User, key: "profile" },
  { label: "Settings", icon: Settings, key: "settings" },
];

const BOOKINGS = [
  { id: "QS-204911", service: "Wedding Film", status: "Editing", date: "12 Jul 2026" },
  { id: "QS-204887", service: "Instagram Reels (x4)", status: "Delivered", date: "28 Jun 2026" },
  { id: "QS-204812", service: "Corporate Ad", status: "Quality Check", date: "05 Jul 2026" },
  { id: "QS-204790", service: "AI Trailer", status: "Rendering", date: "01 Jul 2026" },
];

function Dashboard() {
  const [active, setActive] = useState("overview");
  const title = NAV.find((n) => n.key === active)?.label ?? "Overview";

  return (
    <DashboardShell title={title} items={NAV} active={active} onSelect={setActive}>
      {active === "overview" && (
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Active Projects" value="3" sub="+1 this week" />
            <StatCard label="Delivered" value="18" />
            <StatCard label="Total Spent" value="₹2.4L" />
            <StatCard label="Unread Messages" value="2" />
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">Recent bookings</h2>
            <Table />
          </div>
        </div>
      )}

      {active === "bookings" && (
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">My bookings</h2>
          <Table />
        </div>
      )}

      {active === "payments" && (
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Payment history</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr><th className="pb-3">Invoice</th><th className="pb-3">Service</th><th className="pb-3">Amount</th><th className="pb-3">Status</th></tr>
              </thead>
              <tbody>
                {BOOKINGS.map((b) => (
                  <tr key={b.id} className="border-t border-border">
                    <td className="py-3 font-medium">{b.id}</td>
                    <td className="py-3">{b.service}</td>
                    <td className="py-3">₹{(14999).toLocaleString()}</td>
                    <td className="py-3"><StatusBadge status="Paid" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {active === "downloads" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BOOKINGS.filter((b) => b.status === "Delivered").concat(BOOKINGS.slice(0, 2)).map((b, i) => (
            <div key={i} className="rounded-3xl border border-border bg-card p-5">
              <div className="grid aspect-video place-items-center rounded-2xl" style={{ background: `radial-gradient(circle at 40% 30%, oklch(0.6 0.2 256 / 0.4), oklch(0.15 0.02 264) 70%)` }}>
                <Download className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{b.service}</h3>
              <button className="mt-3 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground">
                Download 4K
              </button>
            </div>
          ))}
        </div>
      )}

      {active === "notifications" && (
        <div className="grid gap-3">
          {["Your AI Trailer is now rendering.", "Wedding Film moved to Editing.", "Invoice QS-204887 paid successfully."].map((n, i) => (
            <div key={i} className="flex items-start gap-3 rounded-3xl border border-border bg-card p-5">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <div>
                <p className="text-sm">{n}</p>
                <p className="text-xs text-muted-foreground">{i + 1}h ago</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {active === "messages" && (
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Messages</h2>
          <div className="mt-4 grid gap-3">
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-secondary p-3 text-sm">Hi! Your wedding film draft is ready for review 🎬</div>
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary p-3 text-sm text-primary-foreground">Amazing, sending notes now!</div>
          </div>
          <div className="mt-4 flex gap-2">
            <input placeholder="Type a message…" className="flex-1 rounded-full border border-input bg-input px-4 py-2.5 text-sm outline-none focus:border-primary" />
            <button className="rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Send</button>
          </div>
        </div>
      )}

      {(active === "profile" || active === "settings") && (
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">{title}</h2>
          <div className="mt-5 grid max-w-lg gap-4">
            <Input label="Full name" defaultValue="Quick Client" />
            <Input label="Email" defaultValue="client@quickshotly.com" />
            <Input label="Mobile" defaultValue="+91 98765 43210" />
            <button className="justify-self-start rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Save changes</button>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

function Table() {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-muted-foreground">
          <tr><th className="pb-3">Project ID</th><th className="pb-3">Service</th><th className="pb-3">Date</th><th className="pb-3">Status</th></tr>
        </thead>
        <tbody>
          {BOOKINGS.map((b) => (
            <tr key={b.id} className="border-t border-border">
              <td className="py-3 font-medium">{b.id}</td>
              <td className="py-3">{b.service}</td>
              <td className="py-3 text-muted-foreground">{b.date}</td>
              <td className="py-3"><StatusBadge status={b.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Input({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input defaultValue={defaultValue} className="mt-1.5 w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary" />
    </div>
  );
}
