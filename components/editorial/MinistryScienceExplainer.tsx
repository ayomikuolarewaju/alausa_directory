import { getEditorialSections } from "@/lib/data-access";
import EditorialContent from "./EditorialContent";

export default async function MinistryScienceExplainer() {
  const sections = await getEditorialSections("min-science");
  return <EditorialContent pageKey="min-science" sections={sections} />;
}
