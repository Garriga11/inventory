"use server";
import prisma from "@/lib/prisma";

export async function getCustomReport({ startDate, endDate, customerId }: {
  startDate: string;
  endDate: string;
  customerId?: string;
}) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const invoices = await prisma.invoice.findMany({
    where: {
      createdAt: { gte: start, lte: end },
      ...(customerId ? { customer: { id: customerId } } : {}),
    },
    select: {
      id: true,
      customer: { select: { name: true } },
      createdAt: true,
      total: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return invoices;
}
