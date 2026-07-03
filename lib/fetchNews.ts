import Parser from "rss-parser";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  categoryColor: string;
  date: string;
  source: string;
  sourceColor: string;
  url: string;
  featured: boolean;
};

const RSS_FEEDS = [
  { url: "https://www.vanguardngr.com/feed/",          source: "Vanguard",          color: "#1A3A8F" },
  { url: "https://www.premiumtimesng.com/feed",         source: "Premium Times",     color: "#1B7A3E" },
  { url: "https://www.thecable.ng/feed",                source: "The Cable",         color: "#D42B2B" },
  { url: "https://businessday.ng/feed/",                source: "BusinessDay",       color: "#1A3A8F" },
  { url: "https://guardian.ng/feed/",                   source: "The Guardian",      color: "#D42B2B" },
  { url: "https://www.pulse.ng/news/rss",               source: "Pulse Nigeria",     color: "#D42B2B" },
  { url: "https://dailypost.ng/feed/",                  source: "Daily Post",        color: "#1B7A3E" },
  { url: "https://www.channelstv.com/feed/",            source: "Channels TV",       color: "#1A3A8F" },
];

const LAGOS_KEYWORDS = [
  "lagos state", "lagos government", "sanwo-olu", "alausa", "lagos ministry",
  "lagos agency", "lamata", "lasema", "lasepa", "lawma", "lirs", "lasbca",
  "lasuth", "lasu ", "lagos lga", "lagos commissioner", "lagos assembly",
  "lagos secretariat", "lagos parastatal", "ikeja", "lagos budget",
  "lagos infrastructure", "lagos police", "lagos fire", "lagos flood",
  "lagos transport", "lagos health", "lagos school", "lagos hospital",
];

function isRelevant(title: string, desc: string) {
  const t = `${title} ${desc}`.toLowerCase();
  return LAGOS_KEYWORDS.some(kw => t.includes(kw));
}

function detectCategory(text: string): { label: string; color: string } {
  const t = text.toLowerCase();
  if (t.match(/transport|brt|traffic|road|lamata|ferry|rail/))       return { label: "Transportation", color: "#1A3A8F" };
  if (t.match(/health|hospital|medical|lasuth|doctor|covid|disease/)) return { label: "Health",         color: "#D42B2B" };
  if (t.match(/school|education|student|lasu|teacher|waec|exam/))    return { label: "Education",      color: "#1A3A8F" };
  if (t.match(/environment|waste|flood|lawma|lasepa|pollution|drain/))return { label: "Environment",   color: "#1B7A3E" };
  if (t.match(/budget|tax|revenue|finance|lirs|economy|naira/))       return { label: "Finance",       color: "#1B7A3E" };
  if (t.match(/security|police|crime|arrest|lasema|fire|rescue/))     return { label: "Security",      color: "#D42B2B" };
  if (t.match(/housing|estate|property|building|lasbca|rent/))        return { label: "Housing",       color: "#1A3A8F" };
  if (t.match(/business|trade|investment|commerce|market/))           return { label: "Business",      color: "#D42B2B" };
  return { label: "Government", color: "#1A3A8F" };
}

function cleanText(str?: string) {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim().slice(0, 220);
}

export async function fetchLagosNews(): Promise<{
  items: NewsItem[];
  sources: string[];
  fetchedAt: string;
  successCount: number;
}> {
  const parser = new Parser({
    timeout: 10000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  const allItems: NewsItem[] = [];
  let successCount = 0;

  const results = await Promise.allSettled(
    RSS_FEEDS.map(feed => parser.parseURL(feed.url))
  );

  results.forEach((result, i) => {
    if (result.status === "rejected") return;
    successCount++;
    const feed = RSS_FEEDS[i];

    result.value.items.forEach(item => {
      const title = item.title?.trim() ?? "";
      const desc  = cleanText(item.contentSnippet ?? item.content ?? item.summary ?? "");
      const url   = item.link ?? "";
      if (!title || !url) return;
      if (!isRelevant(title, desc)) return;

      const cat    = detectCategory(`${title} ${desc}`);
      const pubDate = item.pubDate ?? item.isoDate;
      const dateStr = pubDate
        ? new Date(pubDate).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
        : new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

      allItems.push({
        id:            Buffer.from(url).toString("base64").slice(0, 16),
        title,
        summary:       desc,
        category:      cat.label,
        categoryColor: cat.color,
        date:          dateStr,
        source:        feed.source,
        sourceColor:   feed.color,
        url,
        featured:      false,
      });
    });
  });

  // Sort newest first
  allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Deduplicate similar titles
  const seen  = new Set<string>();
  const deduped = allItems.filter(item => {
    const key = item.title.toLowerCase().slice(0, 55);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Mark top 3 as featured
  deduped.slice(0, 3).forEach(item => { item.featured = true; });

  return {
    items:        deduped.slice(0, 40),
    sources:      RSS_FEEDS.filter((_, i) => results[i].status === "fulfilled").map(f => f.source),
    fetchedAt:    new Date().toISOString(),
    successCount,
  };
}
