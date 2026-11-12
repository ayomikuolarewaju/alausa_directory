export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Table<Row> = {
  Row: Row;
  Insert: Row;
  Update: Partial<Row>;
  Relationships: [];
};

export type EntityRow = {
  id: string;
  name: string;
  category: "ministry" | "agency" | "parastatal";
  description: string;
  location: string;
  address: string;
  phone: string;
  additional_phones: string[];
  email: string;
  additional_emails: string[];
  website: string | null;
  block: string | null;
  verified: boolean;
  needs_verification: boolean;
  last_updated: string;
  last_reviewed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type EntityOfficerRow = {
  id: number;
  entity_id: string;
  sort_order: number;
  name: string;
  title: string;
  phone: string | null;
  email: string | null;
  verified: boolean;
};

export type SourceRow = {
  id: number;
  entity_id: string;
  sort_order: number;
  label: string;
  url: string;
  checked_at: string;
  supports: string;
};

export type LgaRow = {
  id: string;
  name: string;
  chairman: string;
  vice_chairman: string | null;
  address: string;
  phone: string;
  email: string | null;
  zone: "Island" | "Mainland" | "Suburban";
  wards: number;
  population: string;
  headquarters: string;
  area: string;
  coordinates: Json;
  established: string;
  bio: string;
  history: string;
  landmarks: Json;
  known_for: Json;
  local_council_development_areas: Json;
  postal_code: string | null;
};

export type LgaOfficerRow = {
  id: number;
  lga_id: string;
  sort_order: number;
  name: string;
  title: string;
};

export type LcdaRow = {
  id: string;
  name: string;
  parent_lga_id: string;
  parent_lga_name: string;
  chairman: string;
  vice_chairman: string | null;
  address: string;
  phone: string;
  email: string | null;
  zone: "Island" | "Mainland" | "Suburban";
  established: string;
  headquarters: string;
  population: string | null;
  area: string | null;
  coordinates: Json;
  bio: string;
  known_for: Json;
};

export type WardRow = {
  id: string;
  lcda_id: string;
  sort_order: number;
  name: string;
  description: string | null;
};

export type TransportDatasetRow = {
  id: "blue-line" | "red-line" | "brt" | "ferry";
  data: Json;
  updated_at: string;
};

export type ServiceNoticeRow = {
  id: string;
  type: "info" | "warning" | "disruption" | "success";
  title: string;
  body: string;
  affected_lines: string[];
  date: string;
  active: boolean;
  source_url: string | null;
  source_label: string | null;
};

export interface Database {
  public: {
    Tables: {
      entities: Table<EntityRow>;
      entity_officers: Table<EntityOfficerRow>;
      sources: Table<SourceRow>;
      lgas: Table<LgaRow>;
      lga_officers: Table<LgaOfficerRow>;
      lcdas: Table<LcdaRow>;
      wards: Table<WardRow>;
      transport_datasets: Table<TransportDatasetRow>;
      service_notices: Table<ServiceNoticeRow>;
      admin_allowlist: Table<{ user_id: string; created_at: string }>;
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      save_entity_record: {
        Args: { p_entity: Json; p_officers: Json; p_sources: Json };
        Returns: undefined;
      };
      save_lga_record: {
        Args: { p_lga: Json; p_officers: Json };
        Returns: undefined;
      };
      save_lcda_record: {
        Args: { p_lcda: Json; p_wards: Json };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
