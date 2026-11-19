import { getEditorialSections } from "@/lib/data-access";
import EditorialContent from "./EditorialContent";

export default async function LgaGuide() {
  const sections = await getEditorialSections("lgas");
  return <EditorialContent pageKey="lgas" sections={sections} />;
}
