"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { ActionResult, AuthActionState } from "@/lib/actions.types";
import type { Entity, EntitySource, Officer } from "@/lib/data";
import type { LCDA, Ward } from "@/lib/lcdaData";
import type { LGA, LGAOfficer } from "@/lib/lgaData";
import type { ServiceNotice } from "@/lib/transport/service-notices";
import { parseTransportDataset } from "@/lib/data-access";
import { requireAdmin } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  serializeEntity,
  serializeLcda,
  serializeLga,
  serializeServiceNotice,
} from "@/lib/supabase/serializers";

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const officerSchema: z.ZodType<Officer> = z.object({
  name: z.string(),
  title: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  verified: z.boolean().optional(),
}).strict();
const sourceSchema: z.ZodType<EntitySource> = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  checkedAt: dateSchema,
  supports: z.string().min(1),
}).strict();

const entitySchema: z.ZodType<Entity> = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  category: z.enum(["ministry", "agency", "parastatal"]),
  description: z.string(),
  location: z.string(),
  address: z.string(),
  phone: z.string(),
  additionalPhones: z.array(z.string()).optional(),
  email: z.string(),
  additionalEmails: z.array(z.string()).optional(),
  website: z.union([z.literal(""), z.string().url()]).optional(),
  sources: z.array(sourceSchema).optional(),
  officers: z.array(officerSchema),
  block: z.string().optional(),
  verified: z.boolean(),
  needsVerification: z.boolean(),
  lastUpdated: dateSchema,
  lastReviewedAt: dateSchema.optional(),
}).strict();

const lgaOfficerSchema: z.ZodType<LGAOfficer> = z.object({
  name: z.string(),
  title: z.string(),
}).strict();
const coordinatesSchema = z.object({ lat: z.number(), lng: z.number() }).strict();
const lgaSchema: z.ZodType<LGA> = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  chairman: z.string(),
  viceChairman: z.string().optional(),
  officers: z.array(lgaOfficerSchema),
  address: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  zone: z.enum(["Island", "Mainland", "Suburban"]),
  wards: z.number().int().nonnegative(),
  population: z.string(),
  headquarters: z.string(),
  area: z.string(),
  coordinates: coordinatesSchema,
  established: z.string(),
  bio: z.string(),
  history: z.string(),
  landmarks: z.array(z.string()),
  knownFor: z.array(z.string()),
  localCouncilDevelopmentAreas: z.array(z.string()),
  postalCode: z.string().optional(),
}).strict();

const wardSchema: z.ZodType<Ward> = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string(),
  description: z.string().optional(),
}).strict();
const lcdaSchema: z.ZodType<LCDA> = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  parentLgaId: z.string().min(1),
  parentLgaName: z.string().min(1),
  chairman: z.string(),
  viceChairman: z.string().optional(),
  address: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  zone: z.enum(["Island", "Mainland", "Suburban"]),
  established: z.string(),
  headquarters: z.string(),
  population: z.string().optional(),
  area: z.string().optional(),
  coordinates: coordinatesSchema,
  bio: z.string(),
  knownFor: z.array(z.string()),
  wards: z.array(wardSchema),
}).strict();

const noticeSchema: z.ZodType<ServiceNotice> = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  type: z.enum(["info", "warning", "disruption", "success"]),
  title: z.string().min(1),
  body: z.string().min(1),
  affectedLines: z.array(z.string()),
  date: z.string().min(1),
  active: z.boolean(),
  sourceUrl: z.string().url().optional(),
  sourceLabel: z.string().optional(),
}).strict();

const transportSchema = z.object({
  id: z.enum(["blue-line", "red-line", "brt", "ferry"]),
  data: z.unknown(),
}).strict();

function validationError(error: z.ZodError): ActionResult {
  return { ok: false, error: error.issues.map((issue) => issue.message).join(" ") };
}

function revalidateEntity(entity: Pick<Entity, "id" | "category">) {
  const segment =
    entity.category === "ministry"
      ? "ministries"
      : entity.category === "agency"
        ? "agencies"
        : "parastatals";
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath(`/${segment}`);
  revalidatePath(`/${segment}/${entity.id}`);
  revalidatePath("/sitemap.xml");
}

function revalidateLga(id: string) {
  revalidatePath("/lgas");
  revalidatePath("/about");
  revalidatePath(`/lgas/${id}`);
}

function revalidateLcda(id: string, parentLgaId: string, wards: Ward[]) {
  revalidatePath("/lgas");
  revalidatePath(`/lgas/${parentLgaId}`);
  revalidatePath(`/lgas/lcda/${id}`);
  for (const ward of wards) revalidatePath(`/lgas/ward/${ward.id}`);
}

function revalidateTransport(id?: string) {
  const paths = ["/transport", "/transport/rail", "/transport/rail/blue-line", "/transport/rail/red-line", "/transport/brt", "/transport/ferry"];
  for (const path of paths) revalidatePath(path);
  if (id) revalidatePath(`/transport/${id}`);
}

async function saveEntity(input: unknown, mode: "create" | "update"): Promise<ActionResult> {
  const parsed = entitySchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);
  const entity = parsed.data;
  const supabase = await requireAdmin();
  const { data: existing, error: lookupError } = await supabase
    .from("entities")
    .select("id")
    .eq("id", entity.id)
    .maybeSingle();
  if (lookupError) return { ok: false, error: lookupError.message };
  if (mode === "create" && existing) return { ok: false, error: "An entity with this ID already exists." };
  if (mode === "update" && !existing) return { ok: false, error: "Entity not found." };

  const { error } = await supabase.rpc("save_entity_record", {
    ...serializeEntity(entity),
  });
  if (error) return { ok: false, error: error.message };
  revalidateEntity(entity);
  return { ok: true };
}

export async function createEntity(input: unknown): Promise<ActionResult> {
  return saveEntity(input, "create");
}

export async function updateEntity(input: unknown): Promise<ActionResult> {
  return saveEntity(input, "update");
}

export async function deleteEntity(id: string): Promise<ActionResult> {
  if (!/^[a-z0-9-]+$/.test(id)) return { ok: false, error: "Invalid entity ID." };
  const supabase = await requireAdmin();
  const { data: entity, error: lookupError } = await supabase
    .from("entities")
    .select("id, category")
    .eq("id", id)
    .maybeSingle();
  if (lookupError) return { ok: false, error: lookupError.message };
  if (!entity) return { ok: false, error: "Entity not found." };
  const { error } = await supabase.from("entities").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateEntity(entity);
  return { ok: true };
}

async function saveLga(input: unknown, mode: "create" | "update"): Promise<ActionResult> {
  const parsed = lgaSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);
  const lga = parsed.data;
  const supabase = await requireAdmin();
  const { data: existing, error: lookupError } = await supabase
    .from("lgas")
    .select("id")
    .eq("id", lga.id)
    .maybeSingle();
  if (lookupError) return { ok: false, error: lookupError.message };
  if (mode === "create" && existing) return { ok: false, error: "An LGA with this ID already exists." };
  if (mode === "update" && !existing) return { ok: false, error: "LGA not found." };

  const { error } = await supabase.rpc("save_lga_record", {
    ...serializeLga(lga),
  });
  if (error) return { ok: false, error: error.message };
  revalidateLga(lga.id);
  return { ok: true };
}

export async function createLga(input: unknown): Promise<ActionResult> {
  return saveLga(input, "create");
}

export async function updateLga(input: unknown): Promise<ActionResult> {
  return saveLga(input, "update");
}

export async function deleteLga(id: string): Promise<ActionResult> {
  if (!/^[a-z0-9-]+$/.test(id)) return { ok: false, error: "Invalid LGA ID." };
  const supabase = await requireAdmin();
  const { data: existing, error: lookupError } = await supabase
    .from("lgas")
    .select("id")
    .eq("id", id)
    .maybeSingle();
  if (lookupError) return { ok: false, error: lookupError.message };
  if (!existing) return { ok: false, error: "LGA not found." };
  const { error } = await supabase.from("lgas").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateLga(id);
  return { ok: true };
}

async function saveLcda(input: unknown, mode: "create" | "update"): Promise<ActionResult> {
  const parsed = lcdaSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);
  const lcda = parsed.data;
  const supabase = await requireAdmin();
  const { data: existing, error: lookupError } = await supabase
    .from("lcdas")
    .select("id")
    .eq("id", lcda.id)
    .maybeSingle();
  if (lookupError) return { ok: false, error: lookupError.message };
  if (mode === "create" && existing) return { ok: false, error: "An LCDA with this ID already exists." };
  if (mode === "update" && !existing) return { ok: false, error: "LCDA not found." };

  const { error } = await supabase.rpc("save_lcda_record", {
    ...serializeLcda(lcda),
  });
  if (error) return { ok: false, error: error.message };
  revalidateLcda(lcda.id, lcda.parentLgaId, lcda.wards);
  return { ok: true };
}

export async function createLcda(input: unknown): Promise<ActionResult> {
  return saveLcda(input, "create");
}

export async function updateLcda(input: unknown): Promise<ActionResult> {
  return saveLcda(input, "update");
}

export async function deleteLcda(id: string): Promise<ActionResult> {
  if (!/^[a-z0-9-]+$/.test(id)) return { ok: false, error: "Invalid LCDA ID." };
  const supabase = await requireAdmin();
  const { data: existing, error: lookupError } = await supabase
    .from("lcdas")
    .select("id, parent_lga_id")
    .eq("id", id)
    .maybeSingle();
  if (lookupError) return { ok: false, error: lookupError.message };
  if (!existing) return { ok: false, error: "LCDA not found." };
  const { error } = await supabase.from("lcdas").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateLcda(id, existing.parent_lga_id, []);
  return { ok: true };
}

async function saveTransportDataset(input: unknown, mode: "create" | "update"): Promise<ActionResult> {
  const parsed = transportSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);
  const { id } = parsed.data;
  let data: unknown;
  try {
    data = parseTransportDataset(id, parsed.data.data);
  } catch (error) {
    if (error instanceof Error) return { ok: false, error: error.message };
    throw error;
  }

  const supabase = await requireAdmin();
  const { data: existing, error: lookupError } = await supabase
    .from("transport_datasets")
    .select("id")
    .eq("id", id)
    .maybeSingle();
  if (lookupError) return { ok: false, error: lookupError.message };
  if (mode === "create" && existing) return { ok: false, error: "This transport dataset already exists." };
  if (mode === "update" && !existing) return { ok: false, error: "Transport dataset not found." };
  const { error } = await supabase.from("transport_datasets").upsert({
    id,
    data: JSON.parse(JSON.stringify(data)),
    updated_at: new Date().toISOString(),
  });
  if (error) return { ok: false, error: error.message };
  revalidateTransport(id);
  return { ok: true };
}

export async function createTransportDataset(input: unknown): Promise<ActionResult> {
  return saveTransportDataset(input, "create");
}

export async function updateTransportDataset(input: unknown): Promise<ActionResult> {
  return saveTransportDataset(input, "update");
}

export async function deleteTransportDataset(id: string): Promise<ActionResult> {
  const parsedId = z.enum(["blue-line", "red-line", "brt", "ferry"]).safeParse(id);
  if (!parsedId.success) return { ok: false, error: "Invalid transport dataset ID." };
  const supabase = await requireAdmin();
  const { error } = await supabase.from("transport_datasets").delete().eq("id", parsedId.data);
  if (error) return { ok: false, error: error.message };
  revalidateTransport(parsedId.data);
  return { ok: true };
}

async function saveServiceNotice(input: unknown, mode: "create" | "update"): Promise<ActionResult> {
  const parsed = noticeSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);
  const notice = parsed.data;
  const supabase = await requireAdmin();
  const { data: existing, error: lookupError } = await supabase
    .from("service_notices")
    .select("id")
    .eq("id", notice.id)
    .maybeSingle();
  if (lookupError) return { ok: false, error: lookupError.message };
  if (mode === "create" && existing) return { ok: false, error: "A notice with this ID already exists." };
  if (mode === "update" && !existing) return { ok: false, error: "Service notice not found." };
  const { error } = await supabase.from("service_notices").upsert(serializeServiceNotice(notice));
  if (error) return { ok: false, error: error.message };
  revalidateTransport();
  return { ok: true };
}

export async function createServiceNotice(input: unknown): Promise<ActionResult> {
  return saveServiceNotice(input, "create");
}

export async function updateServiceNotice(input: unknown): Promise<ActionResult> {
  return saveServiceNotice(input, "update");
}

export async function deleteServiceNotice(id: string): Promise<ActionResult> {
  if (!/^[a-z0-9-]+$/.test(id)) return { ok: false, error: "Invalid notice ID." };
  const supabase = await requireAdmin();
  const { error } = await supabase.from("service_notices").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateTransport();
  return { ok: true };
}

export async function signInAdmin(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const credentials = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }).safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!credentials.success) return { error: "Enter a valid email address and password." };

  const supabase = await createSupabaseServerClient();
  const { error: signInError } = await supabase.auth.signInWithPassword(credentials.data);
  if (signInError) return { error: "Sign-in failed. Check your credentials and try again." };

  const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");
  if (adminError) {
    await supabase.auth.signOut();
    return { error: `Could not verify administrator access: ${adminError.message}` };
  }
  if (!isAdmin) {
    await supabase.auth.signOut();
    return { error: "This account is not on the administrator allowlist." };
  }
  redirect("/admin");
}

export async function signOutAdmin(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(`Could not sign out: ${error.message}`);
  redirect("/admin/login");
}

export async function requireAdminForPage(): Promise<void> {
  await requireAdmin();
}
