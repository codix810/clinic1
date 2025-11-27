// app/api/booking/filter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { getDoctorIdFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await dbConnect();
  const doctorId = getDoctorIdFromRequest(req);
  if (!doctorId) return NextResponse.json({ success: false }, { status: 401 });

  const { status } = await req.json();

  const query: any = { doctor: doctorId };
  if (status) query.status = status;

  const bookings = await Booking.find(query).sort({ date: 1, time: 1 });

  return NextResponse.json({ success: true, bookings });
}
