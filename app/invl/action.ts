"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";




export async function addPartAction(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  await prisma.part.create({ data: { name, price, stock } });
  revalidatePath("/invl");
}



// Create invoice and deduct inventory
export async function createInvoiceAction(formData: FormData) {
  const partId = formData.get("partId") as string;
  const quantity = Number(formData.get("quantity"));
  const customer = formData.get("customer") as string;

  const part = await prisma.part.findUnique({ where: { id: partId } });
  if (!part || part.stock < quantity) throw new Error("Insufficient stock");

  // Create invoice and deduct inventory in a transaction
  await prisma.$transaction([
    prisma.invoice.create({
      data: {
        customer,
        total: part.price * quantity,
        createdAt: new Date(),
        items: {
          create: [{ partId, quantity, price: part.price }],
        },
      },
    }),
    prisma.part.update({
      where: { id: partId },
      data: { stock: { decrement: quantity } },
    }),
  ]);

  revalidatePath("/parts");
}

// Mark invoice as paid
export async function markInvoicePaidAction(invoiceId: string) {
  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { paid: true },
  });
  revalidatePath("/parts");
}

// Mark invoice as paid, create Payment and Revenue
export async function payInvoiceAction(invoiceId: string) {
  // Mark invoice as paid
  const invoice = await prisma.invoice.update({
    where: { id: invoiceId },
    data: { paid: true },
  });

  // Create Payment
  const payment = await prisma.payment.create({
    data: {
      invoiceId,
      amount: invoice.total,
      paidAt: new Date(),
    },
  });

  // Create Revenue
  await prisma.revenue.create({
    data: {
      amount: invoice.total,
      source: "Invoice Payment",
      invoiceId,
      paymentId: payment.id,
      paymentDate: payment.paidAt,
    },
  });

  revalidatePath("/invl");
}

// Get all invoices with payment info
export async function getInvoices() {
  return await prisma.invoice.findMany({
    include: {
      payment: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

// Create a custom invoice (admin)
export async function createCustomInvoiceAction(formData: FormData) {
  const customer = formData.get("customer") as string;
  const total = Number(formData.get("total"));
  // You can add more fields as needed
  await prisma.invoice.create({
    data: {
      customer,
      total,
      createdAt: new Date(),
      paid: false,
    },
  });
  revalidatePath("/invl");
}