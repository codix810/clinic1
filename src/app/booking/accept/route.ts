import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { id } = await req.json();
    if (!id)
      return NextResponse.json({ success: false, error: "Missing id" });

    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        status: "confirmed",
        confirmedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Error confirming booking" },
      { status: 500 }
    );
  }
}
