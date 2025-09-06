import prisma from "@/lib/prisma";
import { TicketIcon, UserIcon, CurrencyDollarIcon, ChartBarIcon } from "@heroicons/react/16/solid";
import SideNav from "@/components/sideNav";
// Removed exportInvoicesAction import; using API route for download
import ReportForm from "@/components/ReportForm";
import ReportTable from "@/components/ReportTable";
import { useSearchParams } from "next/navigation";

import Link from "next/link";

export default async function AdminDashboard() {
  const partsCount = await prisma.part.count();
  const invoicesCount = await prisma.invoice.count();
  const paidInvoicesCount = await prisma.invoice.count({ where: { paid: true } });
  const totalInventoryValue = await prisma.part.aggregate({ _sum: { price: true } });
  const lowStockCount = await prisma.part.count({ where: { stock: { lt: 5 } } });
  const unpaidInvoices = await prisma.invoice.count({ where: { paid: false } });
  const revenueThisMonth = await prisma.revenue.aggregate({
    _sum: { amount: true },
    where: {
      paymentDate: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
      <SideNav />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center">
            <UserIcon className="h-8 w-8 text-blue-500 mb-2" />
            <div className="text-lg font-bold">{partsCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Parts</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-green-500 mb-2" />
            <div className="text-lg font-bold">${totalInventoryValue._sum.price?.toFixed(2) ?? "0.00"}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Inventory Value</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center">
            <TicketIcon className="h-8 w-8 text-yellow-500 mb-2" />
            <div className="text-lg font-bold">{unpaidInvoices}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Unpaid Invoices</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center">
            <ChartBarIcon className="h-8 w-8 text-purple-500 mb-2" />
            <div className="text-lg font-bold">${revenueThisMonth._sum.amount?.toFixed(2) ?? "0.00"}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Revenue This Month</div>
          </div>
        </div>
        {/* Export/Download Data */}
        <a
          href="/api/export-invoices"
          className="bg-blue-600 text-white px-4 py-2 rounded mb-6 inline-block"
          download
        >
          Export Invoices (CSV)
        </a>
  {/* Custom Reports */}
  <ReportForm />
        {/* ...existing dashboard content... */}
      </main>
    </div>
  );
}