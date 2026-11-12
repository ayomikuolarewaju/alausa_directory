import type { Metadata } from "next";
import { connection } from "next/server";
import AdminLoginForm from "./AdminLoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin sign in | Alausa Directory",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  await connection();
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <section className="rounded-2xl bg-white p-8" style={{ border: "2px solid #0D0D0D" }}>
        <h1 className="font-display text-3xl font-black mb-2">Admin sign in</h1>
        <p className="text-sm text-gray-600 mb-6">
          Sign in with an account on the Supabase administrator allowlist.
        </p>
        {isSupabaseConfigured() ? (
          <AdminLoginForm />
        ) : (
          <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            Supabase is not configured yet. Add the public project URL and publishable key to the local environment, then apply the database migration.
          </p>
        )}
      </section>
    </main>
  );
}
