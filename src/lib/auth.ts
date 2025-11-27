import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface DoctorPayload {
  id: string;          // doctor _id من الداتا
  role: "doctor";
}

interface AdminPayload {
  id: string;          // admin ID
  role: "admin";
}

type AnyPayload = DoctorPayload | AdminPayload;

export function verifyToken(req: NextRequest): AnyPayload | null {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return null;

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AnyPayload;
    return decoded;
  } catch (err) {
    return null;
  }
}

export function getDoctorIdFromRequest(req: NextRequest): string | null {
  const payload = verifyToken(req);
  if (!payload) return null;

  if (payload.role !== "doctor") return null; // block admin
  return payload.id;
}

export function getAdminIdFromRequest(req: NextRequest): string | null {
  const payload = verifyToken(req);
  if (!payload) return null;

  if (payload.role !== "admin") return null; // block doctor
  return payload.id;
}
