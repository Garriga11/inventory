import type { Invoice } from "./ReportForm";

type Props = {
  invoices: Invoice[];
};

export default function ReportTable({ invoices }: Props) {
  if (!invoices || invoices.length === 0) {
    return <div className="text-gray-500">No results found.</div>;
  }
  return (
    <table className="min-w-[400px] w-full border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-gray-900 mt-4">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          <th className="px-4 py-2 border-b font-semibold text-left">ID</th>
          <th className="px-4 py-2 border-b font-semibold text-left">Customer</th>
          <th className="px-4 py-2 border-b font-semibold text-left">Date</th>
          <th className="px-4 py-2 border-b font-semibold text-left">Total</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv, idx) => (
          <tr key={inv.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
            <td className="px-4 py-2 border-b">{inv.id}</td>
            <td className="px-4 py-2 border-b">{inv.customer}</td>
            <td className="px-4 py-2 border-b">{new Date(inv.createdAt).toLocaleDateString()}</td>
            <td className="px-4 py-2 border-b">${inv.total.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
