import { getEditorialSections } from "@/lib/data-access";
import EditorialContent from "./EditorialContent";

export default async function HomeAbout() {
  const sections = await getEditorialSections("home");
  return <EditorialContent pageKey="home" sections={sections} />;
}
