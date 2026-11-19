import { getEditorialSections } from "@/lib/data-access";
import EditorialContent from "./EditorialContent";

export default async function BrtGuide() {
  const sections = await getEditorialSections("brt");
  return <EditorialContent pageKey="brt" sections={sections} />;
}
