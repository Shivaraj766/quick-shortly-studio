import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <main className="flex-1">{children}</main>
      <FloatingWhatsApp />
    </div>
  );
}
