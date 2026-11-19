import { getEditorialSections } from "@/lib/data-access";
import EditorialContent from "./EditorialContent";

export default async function FerryGuide() {
  const sections = await getEditorialSections("ferry");
  return <EditorialContent pageKey="ferry" sections={sections} />;
}
