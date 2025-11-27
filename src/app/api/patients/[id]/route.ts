// app/api/patients/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Patient from "@/models/Patient";
import { getDoctorIdFromRequest } from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  await dbConnect();
  const doctorId = getDoctorIdFromRequest(req);
  if (!doctorId) return NextResponse.json({ success: false }, { status: 401 });

  const patient = await Patient.findOne({ _id: params.id, doctor: doctorId });
  if (!patient) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true, patient });
}

export async function PUT(req: NextRequest, { params }: Params) {
  await dbConnect();
  const doctorId = getDoctorIdFromRequest(req);
  if (!doctorId) return NextResponse.json({ success: false }, { status: 401 });

  const body = await req.json();

  const patient = await Patient.findOneAndUpdate(
    { _id: params.id, doctor: doctorId },
    body,
    { new: true }
  );

  if (!patient) {
    return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, patient });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  await dbConnect();
  const doctorId = getDoctorIdFromRequest(req);
  if (!doctorId) return NextResponse.json({ success: false }, { status: 401 });

  await Patient.findOneAndDelete({ _id: params.id, doctor: doctorId });

  return NextResponse.json({ success: true });
}
