// app/api/booking/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { getDoctorIdFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await dbConnect();
  const doctorId = getDoctorIdFromRequest(req);
  if (!doctorId) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, phone, place, branch, date, time, type, notes } = body;

  if (!name || !phone || !place || !date || !time || !type) {
    return NextResponse.json(
      { success: false, message: "بيانات ناقصة" },
      { status: 400 }
    );
  }

  const booking = await Booking.create({
    doctor: doctorId,
    name,
    phone,
    place,
    branch: place === "online" ? "online" : branch,
    date,
    time,
    type,
    notes,
    status: "pending",
  });

  return NextResponse.json({ success: true, booking }, { status: 201 });
}
