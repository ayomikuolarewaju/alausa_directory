import { MetadataRoute } from "next";
import { getEntities } from "@/lib/data-access";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.alausadirectory.com";
// Also registered: alausadirectory.com.ng — both point to same site

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entities = await getEntities();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/ministries`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/agencies`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/parastatals`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/lgas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/emergency`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/methodology`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/changelog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/disclaimer`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/guides`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides/cashless-cowry-card`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides/brt-fares-2026`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const entityRoutes: MetadataRoute.Sitemap = entities.map((entity) => {
    const segment = entity.category === "ministry" ? "ministries" : entity.category === "agency" ? "agencies" : "parastatals";
    return { url: `${BASE_URL}/${segment}/${entity.id}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 };
  });

  return [...staticRoutes, ...entityRoutes];
}
