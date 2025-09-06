"use server";
import prisma from "@/lib/prisma";
import { parse } from "json2csv";

// Export invoices as CSV
export async function exportInvoices() {
  const invoices = await prisma.invoice.findMany();
  const csv = parse(invoices);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=\"invoices.csv\""
    }
  });
}

// Custom report server action
export async function getCustomReport(formData: FormData) {
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = new Date(formData.get("endDate") as string);
  const customerId = formData.get("customerId") as string | null;
  const invoices = await prisma.invoice.findMany({
    where: {
      createdAt: { gte: startDate, lte: endDate },
      ...(customerId ? { customer: { id: customerId } } : {}),
    },
  });
  // You can return or render this data as needed
  // For now, just return as JSON
  return JSON.stringify(invoices);
}
