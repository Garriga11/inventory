import { NextResponse } from "next/server";
import { exportInvoices } from "@/app/dashboard/admin/reportActions";

export async function GET() {
  const response = await exportInvoices();
  return response;
}
