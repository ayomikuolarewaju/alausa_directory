import "server-only";
import { z } from "zod";
import { entities as localEntities, type Entity, type EntitySource, type Officer } from "./data";
import { lgas as localLgas, type LGA, type LGAOfficer } from "./lgaData";
import { lcdas as localLcdas, type LCDA, type Ward } from "./lcdaData";
import { blueLineData } from "./transport/blue-line";
import { brtData } from "./transport/brt";
import { ferryData } from "./transport/ferry";
import { redLineData } from "./transport/red-line";
import { serviceNotices as localServiceNotices, type ServiceNotice } from "./transport/service-notices";
import { createPublicSupabaseClient } from "./supabase/public";
import { isSupabaseConfigured } from "./supabase/config";
import type {
  EntityOfficerRow,
  EntityRow,
  Json,
  LcdaRow,
  LgaOfficerRow,
  LgaRow,
  ServiceNoticeRow,
  SourceRow,
  WardRow,
} from "./supabase/database.types";

const transportDefaults = {
  "blue-line": blueLineData,
  "red-line": redLineData,
  brt: brtData,
  ferry: ferryData,
};

type TransportDataKey = keyof typeof transportDefaults;

function throwDatabaseError(context: string, error: { message: string }): never {
  throw new Error(`Supabase ${context} failed: ${error.message}`);
}

function groupBy<T>(items: T[], key: (item: T) => string) {
  const grouped = new Map<string, T[]>();
  for (const item of items) {
    const itemKey = key(item);
    const group = grouped.get(itemKey);
    if (group) group.push(item);
    else grouped.set(itemKey, [item]);
  }
  return grouped;
}

function mapEntity(row: EntityRow, officers: EntityOfficerRow[], sources: SourceRow[]): Entity {
  const entity: Entity = {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    location: row.location,
    address: row.address,
    phone: row.phone,
    additionalPhones: row.additional_phones,
    email: row.email,
    additionalEmails: row.additional_emails,
    officers: officers.map(
      (officer): Officer => ({
        name: officer.name,
        title: officer.title,
        ...(officer.phone ? { phone: officer.phone } : {}),
        ...(officer.email ? { email: officer.email } : {}),
        verified: officer.verified,
      }),
    ),
    verified: row.verified,
    needsVerification: row.needs_verification,
    lastUpdated: row.last_updated,
    ...(row.website ? { website: row.website } : {}),
    ...(row.block ? { block: row.block } : {}),
    ...(row.last_reviewed_at ? { lastReviewedAt: row.last_reviewed_at } : {}),
  };

  if (sources.length) {
    entity.sources = sources.map(
      (source): EntitySource => ({
        label: source.label,
        url: source.url,
        checkedAt: source.checked_at,
        supports: source.supports,
      }),
    );
  }
  return entity;
}

export async function getEntities(): Promise<Entity[]> {
  if (!isSupabaseConfigured()) return localEntities;

  const supabase = createPublicSupabaseClient();
  const [entityResult, officerResult, sourceResult] = await Promise.all([
    supabase.from("entities").select("*").order("name"),
    supabase.from("entity_officers").select("*").order("sort_order"),
    supabase.from("sources").select("*").order("sort_order"),
  ]);
  if (entityResult.error) throwDatabaseError("entity query", entityResult.error);
  if (officerResult.error) throwDatabaseError("officer query", officerResult.error);
  if (sourceResult.error) throwDatabaseError("source query", sourceResult.error);

  const officersByEntity = groupBy(officerResult.data, (row) => row.entity_id);
  const sourcesByEntity = groupBy(sourceResult.data, (row) => row.entity_id);
  return entityResult.data.map((row) =>
    mapEntity(row, officersByEntity.get(row.id) ?? [], sourcesByEntity.get(row.id) ?? []),
  );
}

export async function getEntitiesByCategory(category: Entity["category"]): Promise<Entity[]> {
  return (await getEntities()).filter((entity) => entity.category === category);
}

export async function getEntityById(id: string): Promise<Entity | undefined> {
  return (await getEntities()).find((entity) => entity.id === id);
}

function parseJsonArray(value: Json, label: string): Json[] {
  if (!Array.isArray(value)) throw new Error(`Supabase returned invalid ${label} data.`);
  return value;
}

function parseStringArray(value: Json, label: string): string[] {
  return parseJsonArray(value, label).map((item) => {
    if (typeof item !== "string") throw new Error(`Supabase returned invalid ${label} data.`);
    return item;
  });
}

function parseCoordinates(value: Json): { lat: number; lng: number } {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    typeof value.lat !== "number" ||
    typeof value.lng !== "number"
  ) {
    throw new Error("Supabase returned invalid coordinate data.");
  }
  return { lat: value.lat, lng: value.lng };
}

function mapLga(row: LgaRow, officers: LgaOfficerRow[]): LGA {
  return {
    id: row.id,
    name: row.name,
    chairman: row.chairman,
    ...(row.vice_chairman ? { viceChairman: row.vice_chairman } : {}),
    officers: officers.map(
      (officer): LGAOfficer => ({ name: officer.name, title: officer.title }),
    ),
    address: row.address,
    phone: row.phone,
    ...(row.email ? { email: row.email } : {}),
    zone: row.zone,
    wards: row.wards,
    population: row.population,
    headquarters: row.headquarters,
    area: row.area,
    coordinates: parseCoordinates(row.coordinates),
    established: row.established,
    bio: row.bio,
    history: row.history,
    landmarks: parseStringArray(row.landmarks, "LGA landmarks"),
    knownFor: parseStringArray(row.known_for, "LGA known-for list"),
    localCouncilDevelopmentAreas: parseStringArray(
      row.local_council_development_areas,
      "LGA LCDA list",
    ),
    ...(row.postal_code ? { postalCode: row.postal_code } : {}),
  };
}

export async function getLGAs(): Promise<LGA[]> {
  if (!isSupabaseConfigured()) return localLgas;

  const supabase = createPublicSupabaseClient();
  const [lgaResult, officerResult] = await Promise.all([
    supabase.from("lgas").select("*").order("name"),
    supabase.from("lga_officers").select("*").order("sort_order"),
  ]);
  if (lgaResult.error) throwDatabaseError("LGA query", lgaResult.error);
  if (officerResult.error) throwDatabaseError("LGA officer query", officerResult.error);

  const officersByLga = groupBy(officerResult.data, (row) => row.lga_id);
  return lgaResult.data.map((row) => mapLga(row, officersByLga.get(row.id) ?? []));
}

function mapLcda(row: LcdaRow, wards: WardRow[]): LCDA {
  return {
    id: row.id,
    name: row.name,
    parentLgaId: row.parent_lga_id,
    parentLgaName: row.parent_lga_name,
    chairman: row.chairman,
    ...(row.vice_chairman ? { viceChairman: row.vice_chairman } : {}),
    address: row.address,
    phone: row.phone,
    ...(row.email ? { email: row.email } : {}),
    zone: row.zone,
    established: row.established,
    headquarters: row.headquarters,
    ...(row.population ? { population: row.population } : {}),
    ...(row.area ? { area: row.area } : {}),
    coordinates: parseCoordinates(row.coordinates),
    bio: row.bio,
    knownFor: parseStringArray(row.known_for, "LCDA known-for list"),
    wards: wards.map(
      (ward): Ward => ({
        id: ward.id,
        name: ward.name,
        ...(ward.description ? { description: ward.description } : {}),
      }),
    ),
  };
}

export async function getLCDAs(): Promise<LCDA[]> {
  if (!isSupabaseConfigured()) return localLcdas;

  const supabase = createPublicSupabaseClient();
  const [lcdaResult, wardResult] = await Promise.all([
    supabase.from("lcdas").select("*").order("name"),
    supabase.from("wards").select("*").order("sort_order"),
  ]);
  if (lcdaResult.error) throwDatabaseError("LCDA query", lcdaResult.error);
  if (wardResult.error) throwDatabaseError("ward query", wardResult.error);

  const wardsByLcda = groupBy(wardResult.data, (row) => row.lcda_id);
  return lcdaResult.data.map((row) =>
    mapLcda(row, wardsByLcda.get(row.id) ?? []),
  );
}

export async function getLGAById(id: string): Promise<LGA | undefined> {
  return (await getLGAs()).find((lga) => lga.id === id);
}

export async function getLCDAsByParentLGA(lgaId: string): Promise<LCDA[]> {
  return (await getLCDAs()).filter((lcda) => lcda.parentLgaId === lgaId);
}

export async function getLCDAById(id: string): Promise<LCDA | undefined> {
  return (await getLCDAs()).find((lcda) => lcda.id === id);
}

export async function getWardById(wardId: string) {
  const lgaById = new Map((await getLGAs()).map((lga) => [lga.id, lga]));
  for (const lcda of await getLCDAs()) {
    const ward = lcda.wards.find((candidate) => candidate.id === wardId);
    if (ward) {
      return {
        ward,
        lcda,
        parentLga: lgaById.get(lcda.parentLgaId),
      };
    }
  }
  return null;
}

function matchesDataShape(template: unknown, value: unknown): boolean {
  if (template === null) return value === null;
  if (Array.isArray(template)) {
    return (
      Array.isArray(value) &&
      (template.length === 0 || value.every((item) => matchesDataShape(template[0], item)))
    );
  }
  if (typeof template === "object") {
    if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
    return Object.entries(template).every(([key, expected]) => {
      if (expected === undefined) return true;
      return (
        Object.prototype.hasOwnProperty.call(value, key) &&
        matchesDataShape(expected, Reflect.get(value, key))
      );
    });
  }
  return typeof value === typeof template;
}

export function parseTransportDataset<K extends TransportDataKey>(
  id: K,
  value: unknown,
): (typeof transportDefaults)[K] {
  const schema = z.custom<(typeof transportDefaults)[K]>((candidate): candidate is (typeof transportDefaults)[K] =>
    matchesDataShape(transportDefaults[id], candidate),
  );
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    throw new Error(`Invalid ${id} transport data.`);
  }
  return parsed.data;
}

export async function getTransportDataset<K extends TransportDataKey>(
  id: K,
): Promise<(typeof transportDefaults)[K]> {
  if (!isSupabaseConfigured()) return transportDefaults[id];

  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("transport_datasets")
    .select("data")
    .eq("id", id)
    .single();
  if (error) throwDatabaseError(`${id} transport query`, error);

  try {
    return parseTransportDataset(id, data.data);
  } catch (e) {
    console.error(`[transport] ${id} DB row is out of date, using local data:`, e);
    return transportDefaults[id];
  }
}

// export async function getTransportDataset<K extends TransportDataKey>(
//   id: K,
// ): Promise<(typeof transportDefaults)[K]> {
//   if (!isSupabaseConfigured()) return transportDefaults[id];

//   const supabase = createPublicSupabaseClient();
//   const { data, error } = await supabase
//     .from("transport_datasets")
//     .select("data")
//     .eq("id", id)
//     .single();
//   if (error) throwDatabaseError(`${id} transport query`, error);
//   return parseTransportDataset(id, data.data);
// }

function mapServiceNotice(row: ServiceNoticeRow): ServiceNotice {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    body: row.body,
    affectedLines: row.affected_lines,
    date: row.date,
    active: row.active,
    ...(row.source_url ? { sourceUrl: row.source_url } : {}),
    ...(row.source_label ? { sourceLabel: row.source_label } : {}),
  };
}

export async function getServiceNotices(): Promise<ServiceNotice[]> {
  if (!isSupabaseConfigured()) return localServiceNotices;

  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("service_notices")
    .select("*")
    .order("date", { ascending: false });
  if (error) throwDatabaseError("service notice query", error);
  return data.map(mapServiceNotice);
}

export async function getDirectorySummary() {
  const [allEntities, allLgas] = await Promise.all([getEntities(), getLGAs()]);
  return {
    ministries: allEntities.filter((entity) => entity.category === "ministry").length,
    agencies: allEntities.filter((entity) => entity.category === "agency").length,
    parastatals: allEntities.filter((entity) => entity.category === "parastatal").length,
    lgas: allLgas.length,
  };
}
