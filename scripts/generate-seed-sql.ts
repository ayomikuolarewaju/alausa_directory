import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { entities } from "../lib/data";
import { lcdas } from "../lib/lcdaData";
import { lgas } from "../lib/lgaData";
import { brtData } from "../lib/transport/brt";
import { ferryData } from "../lib/transport/ferry";
import { blueLineData } from "../lib/transport/blue-line";
import { redLineData } from "../lib/transport/red-line";
import { serviceNotices } from "../lib/transport/service-notices";

type Row = Record<string, unknown>;

const textArrayColumns = new Set(["additional_phones", "additional_emails", "affected_lines"]);
const jsonColumns = new Set([
  "coordinates",
  "landmarks",
  "known_for",
  "local_council_development_areas",
  "data",
]);
const dateColumns = new Set(["last_updated", "last_reviewed_at", "checked_at"]);

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlValue(column: string, value: unknown): string {
  if (value === undefined || value === null) return "NULL";
  if (textArrayColumns.has(column)) {
    const values = value as string[];
    return `ARRAY[${values.map(sqlString).join(", ")}]::text[]`;
  }
  if (jsonColumns.has(column)) {
    return `${sqlString(JSON.stringify(value))}::jsonb`;
  }
  if (dateColumns.has(column)) {
    return `${sqlString(String(value))}::date`;
  }
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return sqlString(value);
  throw new Error(`Unsupported SQL seed value for column "${column}".`);
}

function upsert(
  table: string,
  columns: string[],
  conflictColumns: string[],
  rows: Row[],
): string {
  if (rows.length === 0) return "";
  const values = rows
    .map((row) => `  (${columns.map((column) => sqlValue(column, row[column])).join(", ")})`)
    .join(",\n");
  const updates = columns
    .filter((column) => !conflictColumns.includes(column))
    .map((column) => `    ${column} = EXCLUDED.${column}`)
    .join(",\n");
  const updatedAt =
    table === "entities" || table === "transport_datasets"
      ? ",\n    updated_at = now()"
      : "";

  return [
    `INSERT INTO public.${table} (${columns.join(", ")})`,
    `VALUES\n${values}`,
    `ON CONFLICT (${conflictColumns.join(", ")}) DO UPDATE SET\n${updates}${updatedAt};`,
  ].join("\n");
}

const entityRows = entities.map((entity) => ({
  id: entity.id,
  name: entity.name,
  category: entity.category,
  description: entity.description,
  location: entity.location,
  address: entity.address,
  phone: entity.phone,
  additional_phones: entity.additionalPhones ?? [],
  email: entity.email,
  additional_emails: entity.additionalEmails ?? [],
  website: entity.website,
  block: entity.block,
  verified: entity.verified,
  needs_verification: entity.needsVerification,
  last_updated: entity.lastUpdated,
  last_reviewed_at: entity.lastReviewedAt,
}));

const entityOfficerRows = entities.flatMap((entity) =>
  entity.officers.map((officer, sortOrder) => ({
    entity_id: entity.id,
    sort_order: sortOrder,
    name: officer.name,
    title: officer.title,
    phone: officer.phone,
    email: officer.email,
    verified: officer.verified ?? false,
  })),
);

const sourceRows = entities.flatMap((entity) =>
  (entity.sources ?? []).map((source, sortOrder) => ({
    entity_id: entity.id,
    sort_order: sortOrder,
    label: source.label,
    url: source.url,
    checked_at: source.checkedAt,
    supports: source.supports,
  })),
);

const lgaRows = lgas.map((lga) => ({
  id: lga.id,
  name: lga.name,
  chairman: lga.chairman,
  vice_chairman: lga.viceChairman,
  address: lga.address,
  phone: lga.phone,
  email: lga.email,
  zone: lga.zone,
  wards: lga.wards,
  population: lga.population,
  headquarters: lga.headquarters,
  area: lga.area,
  coordinates: lga.coordinates,
  established: lga.established,
  bio: lga.bio,
  history: lga.history,
  landmarks: lga.landmarks,
  known_for: lga.knownFor,
  local_council_development_areas: lga.localCouncilDevelopmentAreas,
  postal_code: lga.postalCode,
}));

const lgaOfficerRows = lgas.flatMap((lga) =>
  lga.officers.map((officer, sortOrder) => ({
    lga_id: lga.id,
    sort_order: sortOrder,
    name: officer.name,
    title: officer.title,
  })),
);

const lcdaRows = lcdas.map((lcda) => ({
  id: lcda.id,
  name: lcda.name,
  parent_lga_id: lcda.parentLgaId,
  parent_lga_name: lcda.parentLgaName,
  chairman: lcda.chairman,
  vice_chairman: lcda.viceChairman,
  address: lcda.address,
  phone: lcda.phone,
  email: lcda.email,
  zone: lcda.zone,
  established: lcda.established,
  headquarters: lcda.headquarters,
  population: lcda.population,
  area: lcda.area,
  coordinates: lcda.coordinates,
  bio: lcda.bio,
  known_for: lcda.knownFor,
}));

const wardRows = lcdas.flatMap((lcda) =>
  lcda.wards.map((ward, sortOrder) => ({
    id: ward.id,
    lcda_id: lcda.id,
    sort_order: sortOrder,
    name: ward.name,
    description: ward.description,
  })),
);

const transportRows = [
  { id: "blue-line", data: blueLineData },
  { id: "red-line", data: redLineData },
  { id: "brt", data: brtData },
  { id: "ferry", data: ferryData },
];

const noticeRows = serviceNotices.map((notice) => ({
  id: notice.id,
  type: notice.type,
  title: notice.title,
  body: notice.body,
  affected_lines: notice.affectedLines,
  date: notice.date,
  active: notice.active,
  source_url: notice.sourceUrl,
  source_label: notice.sourceLabel,
}));

const statements = [
  upsert(
    "entities",
    [
      "id", "name", "category", "description", "location", "address", "phone",
      "additional_phones", "email", "additional_emails", "website", "block",
      "verified", "needs_verification", "last_updated", "last_reviewed_at",
    ],
    ["id"],
    entityRows,
  ),
  upsert(
    "entity_officers",
    ["entity_id", "sort_order", "name", "title", "phone", "email", "verified"],
    ["entity_id", "sort_order"],
    entityOfficerRows,
  ),
  upsert(
    "sources",
    ["entity_id", "sort_order", "label", "url", "checked_at", "supports"],
    ["entity_id", "sort_order"],
    sourceRows,
  ),
  upsert(
    "lgas",
    [
      "id", "name", "chairman", "vice_chairman", "address", "phone", "email",
      "zone", "wards", "population", "headquarters", "area", "coordinates",
      "established", "bio", "history", "landmarks", "known_for",
      "local_council_development_areas", "postal_code",
    ],
    ["id"],
    lgaRows,
  ),
  upsert(
    "lga_officers",
    ["lga_id", "sort_order", "name", "title"],
    ["lga_id", "sort_order"],
    lgaOfficerRows,
  ),
  upsert(
    "lcdas",
    [
      "id", "name", "parent_lga_id", "parent_lga_name", "chairman", "vice_chairman",
      "address", "phone", "email", "zone", "established", "headquarters",
      "population", "area", "coordinates", "bio", "known_for",
    ],
    ["id"],
    lcdaRows,
  ),
  upsert(
    "wards",
    ["id", "lcda_id", "sort_order", "name", "description"],
    ["id"],
    wardRows,
  ),
  upsert(
    "transport_datasets",
    ["id", "data"],
    ["id"],
    transportRows,
  ),
  upsert(
    "service_notices",
    [
      "id", "type", "title", "body", "affected_lines", "date", "active",
      "source_url", "source_label",
    ],
    ["id"],
    noticeRows,
  ),
];

const sql = [
  "-- Generated from the current structured datasets in lib/.",
  "-- Safe to re-run: rows are inserted or updated without deleting existing rows.",
  "-- admin_allowlist is intentionally excluded; it requires real auth.users UUIDs.",
  "BEGIN;",
  ...statements,
  "COMMIT;",
  "",
].join("\n\n");

async function main() {
  const outputPath = resolve(process.cwd(), "supabase", "seed.sql");
  await writeFile(outputPath, sql, "utf8");
  console.log(`Wrote ${outputPath}`);
  console.log(
    `Included ${entities.length} entities, ${entityOfficerRows.length} entity officers, ` +
    `${sourceRows.length} sources, ${lgas.length} LGAs, ${lcdas.length} LCDAs, ` +
    `${wardRows.length} wards, 4 transport datasets, and ${noticeRows.length} service notices.`,
  );
}

main().catch((error: unknown) => {
  console.error("Could not generate Supabase seed SQL:", error);
  process.exitCode = 1;
});
