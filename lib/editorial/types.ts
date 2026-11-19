export const EDITORIAL_PAGE_KEYS = [
  "home",
  "lgas",
  "brt",
  "ferry",
  "transport",
  "min-science",
] as const;

export type EditorialBlock =
  | { type: "heading"; level: 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type EditorialSection = {
  id: string;
  page_key: string;
  title: string;
  content: EditorialBlock[];
  sort_order: number;
  published: boolean;
  updated_at?: string;
};

export type EditorialSectionInput = Omit<EditorialSection, "updated_at">;
