"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#F5C518", color: "#0D0D0D" }}>
          Get in Touch
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Contact Us</h1>
        <p className="text-gray-500 max-w-xl">Have feedback, corrections, or questions about the Lagos State Government Directory? We would love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Info panel */}
        <div className="md:col-span-2 space-y-4">
          {[
            { icon: "🏛️", title: "Lagos State Government", body: "Secretariat, Alausa, Ikeja, Lagos State, Nigeria" },
            { icon: "📞", title: "General Enquiries", body: "+234-8111133427" },
            { icon: "✉️", title: "Email", body: "alausadirectory@gmail.com" },
            { icon: "🕐", title: "Office Hours", body: "Monday – Friday\n8:00 AM – 4:00 PM" },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl" style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-gray-500 text-sm whitespace-pre-line">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="md:col-span-3">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl" style={{ background: "#fff", border: "2px solid #0D0D0D", boxShadow: "6px 6px 0 #0D0D0D" }}>
              <div className="text-5xl mb-4">✅</div>
              <h2 className="font-display font-bold text-2xl mb-2">Message Sent!</h2>
              <p className="text-gray-500 max-w-xs">Thank you for your feedback. Check your inbox — a confirmation has been sent to you.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-6 px-6 py-2 rounded-lg font-semibold text-sm"
                style={{ background: "#1A3A8F", color: "#fff", border: "2px solid #0D0D0D" }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="rounded-2xl p-8" style={{ background: "#fff", border: "2px solid #0D0D0D", boxShadow: "6px 6px 0 #0D0D0D" }}>
              <h2 className="font-display font-bold text-xl mb-6">Send a Message</h2>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-lg text-sm font-medium" style={{ background: "#FEE2E2", color: "#D42B2B", border: "1px solid #D42B2B" }}>
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Full Name *</label>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="e.g. Bola Ahmed"
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                      style={{ border: "2px solid #0D0D0D" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Email Address *</label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                      style={{ border: "2px solid #0D0D0D" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Subject</label>
                  <select
                    name="subject" value={form.subject} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: "2px solid #0D0D0D" }}
                  >
                    <option value="">Select a subject...</option>
                    <option value="Data Correction">Data Correction</option>
                    <option value="Missing Ministry / Agency">Missing Ministry / Agency</option>
                    <option value="General Feedback">General Feedback</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Message *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    rows={5} placeholder="Write your message here..."
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                    style={{ border: "2px solid #0D0D0D" }}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.email || !form.message}
                  className="w-full py-3 rounded-lg font-bold text-sm transition-opacity disabled:opacity-50"
                  style={{ background: "#1A3A8F", color: "#fff", border: "2px solid #0D0D0D" }}
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
