import { NextResponse } from "next/server";
import { fetchLagosNews } from "@/lib/fetchNews";

export const revalidate = 3600;

export async function GET() {
  const data = await fetchLagosNews();
  return NextResponse.json(data);
}