'use server';

import prisma from "@/lib/prisma";

// Create revenue record when payment is received
export async function getRevenue(revenueId: string) {
  const revenue = await prisma.revenue.findUnique({
    where: { id: revenueId },
  });
  return revenue;
}

export async function createRevenue(data: {
  amount: number;
  description?: string;
  invoiceId?: string;
  paymentDate?: Date;
}) {
  const created = await prisma.revenue.create({
    data: {
      amount: data.amount,
      description: data.description,
      invoiceId: data.invoiceId,
      paymentDate: data.paymentDate || new Date(),
    },
  });
  return { success: true, revenueId: created.id };
}



export async function getRevenueSummary(
  startDate: Date, 
  endDate: Date
) {
  try {
    const revenue = await prisma.revenue.findMany({
      where: {
        paymentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        invoice: true,
      },
      orderBy: {
        paymentDate: 'desc',
      },
    });



    const totalRevenue = revenue.reduce((sum: any, rev: any) => sum + rev.amount, 0);

    return {
      success: true,
      revenue,
      totalRevenue,
      period: { startDate, endDate },
    };
  } catch (error) {
    console.error('Error getting revenue summary:', error);
    return { success: false, error: 'Failed to get revenue summary' };
  }
}

// Get daily revenue for charts
export async function getDailyRevenue(days: number = 30) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

  const revenue = await prisma.revenue.findMany({
      where: {
        paymentDate: {
          gte: startDate,
        },
      },
      select: {
        amount: true,
        paymentDate: true,
        source: true,
      },
      orderBy: {
        paymentDate: 'asc',
      },
    });
    return revenue;
  } catch (error) {
    console.error('Error getting daily revenue:', error);
    return [];
  }
}