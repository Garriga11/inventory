"use client";
import { useState, useTransition } from "react";
import ReportTable from "./ReportTable";
import { getCustomReport } from "@/app/dashboard/admin/action";

export type Invoice = {
  id: string;
  customer: string;
  createdAt: string | Date;
  total: number;
};

export default function ReportForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [report, setReport] = useState<Invoice[]>([]);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const data = await getCustomReport({ startDate, endDate, customerId });
      // Map the API result to match the Invoice type
      setReport(
        data.map((item: any) => ({
          id: item.id,
          customer: item.customer?.name ?? "",
          createdAt: item.createdAt,
          total: item.total,
        }))
      );
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 items-end bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Customer (optional)</label>
          <input
            type="text"
            className="border rounded px-2 py-1"
            placeholder="Customer name"
            value={customerId}
            onChange={e => setCustomerId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Run Report"}
        </button>
      </form>
      <ReportTable invoices={report} />
    </>
  );
}