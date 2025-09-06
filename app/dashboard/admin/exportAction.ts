"use server";
import { exportInvoices } from "@/app/dashboard/admin/reportActions";

export async function exportInvoicesAction() {
  return await exportInvoices();
}
