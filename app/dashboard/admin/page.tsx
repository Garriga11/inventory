import prisma from "@/lib/prisma";
import { TicketIcon, UserIcon, CurrencyDollarIcon, ChartBarIcon } from "@heroicons/react/16/solid";
import SideNav from "@/components/sideNav";

import Link from "next/link";

export default async function AdminDashboard() {
  const partsCount = await prisma.part.count();
  const invoicesCount = await prisma.invoice.count();
  const paidInvoicesCount = await prisma.invoice.count({ where: { paid: true } });
  const totalRevenue = await prisma.invoice.aggregate({
    _sum: {
      total: true,
    },
    where: { paid: true },
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
      <SideNav />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/invl" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{partsCount}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Parts</p>
              </div>
            </div>
          </Link>
          <Link href="/invl" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{totalRevenue._sum.total}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}