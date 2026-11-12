import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { createSupabaseServerClient } from "./server";

export async function requireAdmin(): Promise<SupabaseClient<Database>> {
  const supabase = await createSupabaseServerClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError) {
    throw new Error(`Could not verify the current Supabase session: ${claimsError.message}`);
  }
  if (!claimsData?.claims?.sub) {
    throw new Error("Authentication is required for this action.");
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");
  if (adminError) {
    throw new Error(`Could not verify admin access: ${adminError.message}`);
  }
  if (!isAdmin) {
    throw new Error("This action requires an allowlisted administrator.");
  }

  return supabase;
}
