

import prisma from "@/lib/prisma";

// Group revenue by month
export async function getMonthlyRevenue() {
  const revenue = await prisma.revenue.findMany({
    select: {
      amount: true,
      paymentDate: true,
    },
    orderBy: { paymentDate: "asc" },
  });

  const monthly: { [key: string]: number } = {};
  for (const r of revenue) {
    const month = new Date(r.paymentDate).toLocaleString("default", { year: "numeric", month: "long" });
    monthly[month] = (monthly[month] || 0) + r.amount;
  }
  return Object.entries(monthly).map(([month, total]) => ({ month, total }));
}

// Group revenue by day
export async function getDailyRevenue() {
  const revenue = await prisma.revenue.findMany({
    select: {
      amount: true,
      paymentDate: true,
    },
    orderBy: { paymentDate: "asc" },
  });

  const daily: { [key: string]: number } = {};
  for (const r of revenue) {
    const day = new Date(r.paymentDate).toLocaleDateString();
    daily[day] = (daily[day] || 0) + r.amount;
  }
  return Object.entries(daily).map(([day, total]) => ({ day, total }));
}
