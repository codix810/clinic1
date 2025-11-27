// src/app/api/patients/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Patient from "@/models/Patient";
import { getDoctorIdFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const doctorId = getDoctorIdFromRequest(req);
    if (!doctorId) {
      console.log("GET /api/patients -> no doctorId");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("GET /api/patients -> doctorId:", doctorId);

    const patients = await Patient.find({ doctor: doctorId })
      .sort({ createdAt: -1 })
      .lean();

    console.log("GET /api/patients -> count:", patients.length);

    // نخلي الفورمات ثابت وواضح
    const formatted = patients.map((p: any) => ({
      _id: p._id.toString(),
      fullName: p.fullName,
      phone: p.phone,
      createdAt: p.createdAt,
    }));

    return NextResponse.json({ success: true, patients: formatted }, { status: 200 });
  } catch (err) {
    console.error("GET /api/patients error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
