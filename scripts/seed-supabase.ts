import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { entities } from "../lib/data";
import { lcdas } from "../lib/lcdaData";
import { lgas } from "../lib/lgaData";
import { brtData } from "../lib/transport/brt";
import { ferryData } from "../lib/transport/ferry";
import { blueLineData } from "../lib/transport/blue-line";
import { redLineData } from "../lib/transport/red-line";
import { serviceNotices } from "../lib/transport/service-notices";
import { defaultEditorialSections } from "../lib/editorial/defaults";
import type { Database } from "../lib/supabase/database.types";
import {
  serializeEntity,
  serializeLcda,
  serializeLga,
  serializeServiceNotice,
} from "../lib/supabase/serializers";

loadEnvConfig(process.cwd());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before seeding.",
  );
}

const supabase = createClient<Database>(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function seed() {
  for (const entity of entities) {
    const { error } = await supabase.rpc("save_entity_record", serializeEntity(entity));
    if (error) throw new Error(`Could not seed entity ${entity.id}: ${error.message}`);
  }

  for (const lga of lgas) {
    const { error } = await supabase.rpc("save_lga_record", serializeLga(lga));
    if (error) throw new Error(`Could not seed LGA ${lga.id}: ${error.message}`);
  }

  for (const lcda of lcdas) {
    const { error } = await supabase.rpc("save_lcda_record", serializeLcda(lcda));
    if (error) throw new Error(`Could not seed LCDA ${lcda.id}: ${error.message}`);
  }

  const transportDatasets = [
    { id: "blue-line", data: blueLineData },
    { id: "red-line", data: redLineData },
    { id: "brt", data: brtData },
    { id: "ferry", data: ferryData },
  ] as const;
  for (const dataset of transportDatasets) {
    const { error } = await supabase.from("transport_datasets").upsert({
      id: dataset.id,
      data: dataset.data,
      updated_at: new Date().toISOString(),
    }, { ignoreDuplicates: true });
    if (error) {
      throw new Error(`Could not seed transport data ${dataset.id}: ${error.message}`);
    }
  }

  const { error: noticesError } = await supabase
    .from("service_notices")
    .upsert(serviceNotices.map(serializeServiceNotice));
  if (noticesError) throw new Error(`Could not seed service notices: ${noticesError.message}`);

  const { error: editorialError } = await supabase
    .from("editorial_sections")
    .upsert(defaultEditorialSections.map((section) => ({
      ...section,
      content: JSON.parse(JSON.stringify(section.content)),
      updated_at: new Date().toISOString(),
    })), { ignoreDuplicates: true });
  if (editorialError) throw new Error(`Could not seed editorial sections: ${editorialError.message}`);

  console.log(
    `Seeded ${entities.length} entities, ${lgas.length} LGAs, ${lcdas.length} LCDAs, 4 transport datasets, ${serviceNotices.length} notices, and ${defaultEditorialSections.length} editorial sections.`,
  );
}

seed().catch((error: unknown) => {
  console.error("Supabase seed failed:", error);
  process.exitCode = 1;
});
