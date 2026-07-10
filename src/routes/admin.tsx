import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Briefcase,
  Star,
  Image,
  Bell,
  BarChart3,
  Upload,
} from "lucide-react";
import { DashboardShell, StatCard, StatusBadge, type NavItem } from "@/components/dashboard/DashboardShell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Quick Shotly" }] }),
  component: Admin,
});

const NAV: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, key: "overview" },
  { label: "Users", icon: Users, key: "users" },
  { label: "Bookings", icon: Calendar, key: "bookings" },
  { label: "Payments", icon: CreditCard, key: "payments" },
  { label: "Careers", icon: Briefcase, key: "careers" },
  { label: "Feedback", icon: Star, key: "feedback" },
  { label: "Portfolio", icon: Image, key: "portfolio" },
  { label: "Notifications", icon: Bell, key: "notifications" },
  { label: "Analytics", icon: BarChart3, key: "analytics" },
];

const BOOKINGS = [
  { id: "QS-204911", client: "Aarav Mehta", service: "Wedding Film", status: "Editing" },
  { id: "QS-204887", client: "Priya Sharma", service: "Instagram Reels", status: "Delivered" },
  { id: "QS-204812", client: "Nexus Inc.", service: "Corporate Ad", status: "Quality Check" },
  { id: "QS-204790", client: "Karan Verma", service: "AI Trailer", status: "Rendering" },
  { id: "QS-204755", client: "GlowCo", service: "AI Videos", status: "Pending" },
];

function Admin() {
  const [active, setActive] = useState("overview");
  const title = NAV.find((n) => n.key === active)?.label ?? "Overview";

  return (
    <DashboardShell title={`Admin · ${title}`} items={NAV} active={active} onSelect={setActive}>
      {active === "overview" && (
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Users" value="1,284" sub="+34 this week" />
            <StatCard label="Active Bookings" value="42" sub="+8 today" />
            <StatCard label="Revenue (MTD)" value="₹18.6L" sub="+12%" />
            <StatCard label="Avg Rating" value="4.9★" />
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-6 lg:col-span-2">
              <h2 className="text-lg font-bold">Latest bookings</h2>
              <BookingTable />
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold">Upload delivery</h2>
              <p className="mt-1 text-sm text-muted-foreground">Send a completed video to a client.</p>
              <select className="mt-4 w-full rounded-2xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary">
                {BOOKINGS.map((b) => <option key={b.id}>{b.id} · {b.client}</option>)}
              </select>
              <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border bg-input px-4 py-5 text-sm text-muted-foreground hover:border-primary">
                <Upload className="h-5 w-5 text-primary" /> Upload final video
                <input type="file" accept="video/*" className="hidden" />
              </label>
              <button className="mt-3 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground">Deliver to client</button>
            </div>
          </div>
        </div>
      )}

      {active === "bookings" && (
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">All bookings</h2>
          <BookingTable manage />
        </div>
      )}

      {active === "users" && (
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground"><tr><th className="pb-3">Name</th><th className="pb-3">Email</th><th className="pb-3">Projects</th><th className="pb-3">Role</th></tr></thead>
              <tbody>
                {BOOKINGS.map((b) => (
                  <tr key={b.id} className="border-t border-border">
                    <td className="py-3 font-medium">{b.client}</td>
                    <td className="py-3 text-muted-foreground">{b.client.toLowerCase().replace(/[^a-z]/g, "")}@mail.com</td>
                    <td className="py-3">{Math.ceil(Math.random() * 9)}</td>
                    <td className="py-3"><StatusBadge status="Paid" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {active === "payments" && (
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Payments</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground"><tr><th className="pb-3">Invoice</th><th className="pb-3">Client</th><th className="pb-3">Amount</th><th className="pb-3">Status</th></tr></thead>
              <tbody>
                {BOOKINGS.map((b) => (
                  <tr key={b.id} className="border-t border-border">
                    <td className="py-3 font-medium">{b.id}</td>
                    <td className="py-3">{b.client}</td>
                    <td className="py-3">₹{(24999).toLocaleString()}</td>
                    <td className="py-3"><StatusBadge status="Paid" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {active === "careers" && (
        <div className="grid gap-3">
          {["Video Editor — Riya S.", "Motion Designer — Aman P.", "AI Editor — Neha K."].map((c, i) => (
            <div key={i} className="flex items-center justify-between rounded-3xl border border-border bg-card p-5">
              <div><p className="font-medium">{c}</p><p className="text-xs text-muted-foreground">Applied {i + 1}d ago</p></div>
              <div className="flex gap-2">
                <button className="rounded-full bg-success/15 px-4 py-2 text-xs font-semibold text-success">Shortlist</button>
                <button className="rounded-full border border-border px-4 py-2 text-xs">View</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {active === "feedback" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {["Stunning work!", "Best editors ever.", "Fast and premium.", "10/10 experience."].map((f, i) => (
            <div key={i} className="rounded-3xl border border-border bg-card p-5">
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-primary text-primary" />)}</div>
              <p className="mt-3 text-sm text-muted-foreground">"{f}"</p>
            </div>
          ))}
        </div>
      )}

      {active === "portfolio" && (
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Portfolio manager</h2>
          <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border bg-input px-4 py-6 text-sm text-muted-foreground hover:border-primary">
            <Upload className="h-5 w-5 text-primary" /> Add new portfolio item
            <input type="file" className="hidden" />
          </label>
        </div>
      )}

      {active === "notifications" && (
        <div className="grid gap-3">
          {["New booking from GlowCo.", "Payment received ₹24,999.", "New career application."].map((n, i) => (
            <div key={i} className="flex items-start gap-3 rounded-3xl border border-border bg-card p-5">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" /><p className="text-sm">{n}</p>
            </div>
          ))}
        </div>
      )}

      {active === "analytics" && (
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Conversion" value="6.8%" sub="+0.9%" />
            <StatCard label="Avg Project Value" value="₹21,400" />
            <StatCard label="Repeat Clients" value="38%" sub="+5%" />
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="mb-6 text-lg font-bold">Revenue trend</h2>
            <div className="flex h-48 items-end gap-2">
              {[40, 55, 48, 70, 65, 82, 78, 95, 88, 100, 92, 110].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-primary/30 to-primary" style={{ height: `${h * 0.8}%` }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

function BookingTable({ manage }: { manage?: boolean }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-muted-foreground">
          <tr><th className="pb-3">ID</th><th className="pb-3">Client</th><th className="pb-3">Service</th><th className="pb-3">Status</th>{manage && <th className="pb-3">Action</th>}</tr>
        </thead>
        <tbody>
          {BOOKINGS.map((b) => (
            <tr key={b.id} className="border-t border-border">
              <td className="py-3 font-medium">{b.id}</td>
              <td className="py-3">{b.client}</td>
              <td className="py-3 text-muted-foreground">{b.service}</td>
              <td className="py-3"><StatusBadge status={b.status} /></td>
              {manage && <td className="py-3"><button className="rounded-full border border-border px-3 py-1 text-xs hover:bg-secondary">Update</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
