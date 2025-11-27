import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { status } = await req.json();
    const bookings = await Booking.find(status ? { status } : {})
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Error fetching filtered" }
    );
  }
}
