import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { signOutAdmin } from "@/app/actions";
import { getDirectorySummary } from "@/lib/data-access";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Directory data admin | Alausa Directory",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  await connection();
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createSupabaseServerClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError) throw new Error(`Could not verify the current Supabase session: ${claimsError.message}`);
  if (!claimsData?.claims?.sub) redirect("/admin/login");

  const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");
  if (adminError) throw new Error(`Could not verify admin access: ${adminError.message}`);
  if (!isAdmin) redirect("/admin/login");

  const summary = await getDirectorySummary();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-900 mb-2">Alausa Directory</p>
          <h1 className="font-display text-3xl md:text-4xl font-black">Data administration</h1>
          <p className="text-sm text-gray-600 mt-2">Signed in as {claimsData.claims.email}</p>
        </div>
        <form action={signOutAdmin}>
          <button type="submit" className="rounded-lg border-2 border-black px-4 py-2 text-sm font-semibold">
            Sign out
          </button>
        </form>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          ["Ministries", summary.ministries],
          ["Agencies", summary.agencies],
          ["Parastatals", summary.parastatals],
          ["LGAs", summary.lgas],
        ].map(([label, count]) => (
          <div key={label} className="rounded-xl bg-white p-4 text-center" style={{ border: "2px solid #0D0D0D" }}>
            <p className="font-display text-2xl font-black">{count}</p>
            <p className="text-xs text-gray-600">{label}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl bg-white p-6" style={{ border: "2px solid #0D0D0D" }}>
        <h2 className="font-display text-xl font-bold mb-2">Database content</h2>
        <p className="text-sm leading-relaxed text-gray-600">
          CRUD Server Actions are available for entities, LGAs, LCDAs, transport datasets, and service notices. Writes require an allowlisted administrator and are also restricted by database row-level security.
        </p>
        <p className="text-sm leading-relaxed text-gray-600 mt-3">
          A record-editing interface is not included yet. Public pages remain read-only; administrator tools can call the Server Actions directly.
        </p>
      </section>
    </main>
  );
}
