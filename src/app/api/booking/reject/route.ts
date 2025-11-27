import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { getDoctorIdFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await dbConnect();

  const doctorId = getDoctorIdFromRequest(req);
  if (!doctorId)
    return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await req.json();

  const booking = await Booking.findOneAndUpdate(
    { _id: id, doctor: doctorId },
    { status: "rejected" },
    { new: true }
  );

  if (!booking)
    return NextResponse.json({ success: false, message: "Not found" });

  return NextResponse.json({ success: true });
}
