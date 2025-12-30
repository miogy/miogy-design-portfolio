// app/api/about/route.ts
import { NextResponse } from "next/server";
import { getAbout } from "@/lib/about";

export async function GET() {
  const about = await getAbout();
  return NextResponse.json(about);
}
