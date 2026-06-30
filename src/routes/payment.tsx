import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Download, ShieldCheck, CreditCard, Check } from "lucide-react";
import { PageHero } from "@/components/site/primitives";

const searchSchema = z.object({
  service: z.string().optional().default("Cinematic Video Edit"),
  mode: z.string().optional().default("Shoot & Edit"),
  delivery: z.string().optional().default(""),
});

export const Route = createFileRoute("/payment")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Payment — Quick Shortly" },
      {
        name: "description",
        content: "Securely pay for your Quick Shortly booking via UPI, cards or net banking and download your invoice.",
      },
      { property: "og:title", content: "Payment — Quick Shortly" },
      { property: "og:description", content: "Complete your booking payment securely." },
    ],
  }),
  component: Payment,
});

const METHODS = ["UPI", "Google Pay", "PhonePe", "Paytm", "Credit Card", "Debit Card", "Net Banking"];

function Payment() {
  const { service, mode, delivery } = Route.useSearch();
  const [method, setMethod] = useState("UPI");
  const [paid, setPaid] = useState(false);

  const amount = mode === "Only Edit" ? 14999 : 24999;
  const tax = Math.round(amount * 0.18);
  const total = amount + tax;
  const invoiceNo = "QS-" + Math.floor(100000 + Math.random() * 900000);

  function pay() {
    toast.loading("Processing payment…", { id: "pay" });
    setTimeout(() => {
      toast.success("Payment successful! 🎉", { id: "pay" });
      setPaid(true);
    }, 1400);
  }

  async function downloadInvoice() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Quick Shortly", 20, 25);
    doc.setFontSize(10);
    doc.text("Shoot on iPhone. Edit Like Cinema.", 20, 32);
    doc.setFontSize(14);
    doc.text("INVOICE", 170, 25, { align: "right" });
    doc.setFontSize(10);
    doc.text(`No: ${invoiceNo}`, 170, 32, { align: "right" });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 170, 38, { align: "right" });

    doc.line(20, 45, 190, 45);
    let y = 58;
    const row = (a: string, b: string) => {
      doc.text(a, 20, y);
      doc.text(b, 190, y, { align: "right" });
      y += 9;
    };
    doc.setFontSize(11);
    row("Service", service);
    row("Scope", mode);
    row("Delivery Date", delivery || "To be scheduled");
    y += 4;
    doc.line(20, y, 190, y);
    y += 10;
    row("Subtotal", `INR ${amount.toLocaleString()}`);
    row("GST (18%)", `INR ${tax.toLocaleString()}`);
    doc.setFontSize(13);
    row("Total Paid", `INR ${total.toLocaleString()}`);
    y += 6;
    doc.setFontSize(10);
    doc.text("Thank you for choosing Quick Shortly!", 20, y + 6);
    doc.save(`${invoiceNo}.pdf`);
  }

  return (
    <div>
      <PageHero
        eyebrow="Payment"
        title={<>Secure <span className="text-gradient">checkout</span></>}
        subtitle="Review your booking and complete payment with your preferred method."
      />

      <section className="mx-auto grid max-w-5xl gap-6 px-6 py-10 lg:grid-cols-5">
        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="rounded-[2rem] border border-border bg-card p-6">
            <h2 className="text-lg font-bold">Booking Summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <Line label="Package / Service" value={service} />
              <Line label="Scope" value={mode} />
              <Line label="Delivery Time" value={delivery || "24–48 hours"} />
              <div className="my-3 border-t border-border" />
              <Line label="Subtotal" value={`₹${amount.toLocaleString()}`} />
              <Line label="GST (18%)" value={`₹${tax.toLocaleString()}`} />
              <div className="my-3 border-t border-border" />
              <div className="flex items-center justify-between">
                <dt className="font-semibold">Total Amount</dt>
                <dd className="text-xl font-extrabold text-gradient">₹{total.toLocaleString()}</dd>
              </div>
            </dl>
            <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-success" /> 256-bit secure payment
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="lg:col-span-3">
          <div className="rounded-[2rem] border border-border bg-card p-6">
            <h2 className="text-lg font-bold">Payment Method</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {METHODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                    method === m
                      ? "border-primary bg-primary/10 shadow-glow-sm"
                      : "border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-background/50 p-5">
              {method.includes("Card") ? (
                <div className="grid gap-3">
                  <input placeholder="Card number" className="w-full rounded-xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM / YY" className="rounded-xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary" />
                    <input placeholder="CVV" className="rounded-xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary" />
                  </div>
                </div>
              ) : method === "Net Banking" ? (
                <select className="w-full rounded-xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary">
                  <option>Select your bank</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>State Bank of India</option>
                  <option>Axis Bank</option>
                </select>
              ) : (
                <input placeholder="yourname@upi" className="w-full rounded-xl border border-input bg-input px-4 py-3 text-sm outline-none focus:border-primary" />
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {!paid ? (
                <button
                  onClick={pay}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow"
                >
                  <CreditCard className="h-4 w-4" /> Pay ₹{total.toLocaleString()}
                </button>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-7 py-3 text-sm font-semibold text-success">
                  <Check className="h-4 w-4" /> Payment Successful
                </span>
              )}
              <button
                onClick={downloadInvoice}
                disabled={!paid}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary disabled:opacity-40"
              >
                <Download className="h-4 w-4" /> Download Invoice
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
