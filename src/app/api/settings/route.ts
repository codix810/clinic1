import { NextRequest, NextResponse } from "next/server";
import { getAdminIdFromRequest } from "@/lib/auth";

let settings = {
  branches: ["القاهرة", "الإسكندرية"],
  hours: {}
};

export async function GET(req: NextRequest) {
  const admin = getAdminIdFromRequest(req);
  if (!admin)
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

  return NextResponse.json({ success: true, settings });
}

export async function POST(req: NextRequest) {
  const admin = getAdminIdFromRequest(req);
  if (!admin)
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

  settings = await req.json();
  
  return NextResponse.json({ success: true });
}
