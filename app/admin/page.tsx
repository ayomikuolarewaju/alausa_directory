import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { signOutAdmin } from "@/app/actions";
import ContentEditors from "@/components/admin/ContentEditors";
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

  const [summary, editorialResult, transportResult] = await Promise.all([
    getDirectorySummary(),
    supabase.from("editorial_sections").select("*").order("page_key").order("sort_order"),
    supabase.from("transport_datasets").select("*").order("id"),
  ]);
  if (editorialResult.error) throw new Error(`Could not load editorial sections: ${editorialResult.error.message}`);
  if (transportResult.error) throw new Error(`Could not load transport datasets: ${transportResult.error.message}`);

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

      <ContentEditors
        editorialSections={editorialResult.data}
        transportDatasets={transportResult.data}
      />
    </main>
  );
}
