import { addPartAction, createInvoiceAction, payInvoiceAction, getInvoices, createCustomInvoiceAction } from "./action";
import { getMonthlyRevenue, getDailyRevenue } from "./revActions";

export default async function PartsPage() {
  const parts = await prisma.part.findMany();
  const invoices = await getInvoices();
  const monthlyRevenue = await getMonthlyRevenue();
  const dailyRevenue = await getDailyRevenue();

  return (
    <main className="p-6 rounded shadow-4">
      <h1 className="text-xl font-bold">Parts</h1>

      {/* Add Inventory Form */}
      <form action={addPartAction} className="flex gap-2 mt-4 mb-6 items-end">
        <input name="name" placeholder="Name" required className="border px-2 py-1 rounded" />
        <input name="price" type="number" step="0.01" placeholder="Price" required className="border px-2 py-1 rounded w-24" />
        <input name="stock" type="number" min="0" placeholder="Stock" required className="border px-2 py-1 rounded w-20" />
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Add Part</button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-[400px] w-full border border-gray-300 rounded-lg shadow-sm mt-2 bg-white dark:bg-gray-900">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-2 border-b font-semibold text-left">Name</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Stock</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((p, idx) => (
              <tr key={p.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                <td className="px-4 py-2 border-b">{p.name}</td>
                <td className="px-4 py-2 border-b">{p.stock}</td>
                <td className="px-4 py-2 border-b">${p.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg mt-6">Request Part</h2>
      <form action={createInvoiceAction} className="flex gap-2 mt-2">
        <input name="customer" placeholder="Customer" required className="border px-2" />
        <select name="partId" required>
          {parts.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input type="number" name="quantity" min="1" defaultValue="1" required className="w-16 border px-1" />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Create Invoice</button>
      </form>

      <h2 className="text-lg mt-6">Invoices</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full border border-gray-300 rounded-lg shadow-sm mt-2 bg-white dark:bg-gray-900">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-2 border-b font-semibold text-left">ID</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Customer</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Date</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Paid Date</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Total</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Status</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, idx) => (
              <tr key={inv.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                <td className="px-4 py-2 border-b">{inv.id}</td>
                <td className="px-4 py-2 border-b">{inv.customer}</td>
                <td className="px-4 py-2 border-b">{new Date(inv.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b">{inv.payment?.paidAt ? new Date(inv.payment.paidAt).toLocaleDateString() : "-"}</td>
                <td className="px-4 py-2 border-b">${inv.total.toFixed(2)}</td>
                <td className="px-4 py-2 border-b">{inv.paid ? "Paid" : "Unpaid"}</td>
                <td className="px-4 py-2 border-b">
                  {!inv.paid && (
                    <form action={async (formData) => {
                      'use server';
                      const amount = Number(formData.get('amount'));
                      await payInvoiceAction(inv.id);
                    }}>
                      <input name="amount" type="number" min="0.01" step="0.01" defaultValue={inv.total} className="border px-2 py-1 rounded w-24 mr-2" />
                      <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded mt-2">Pay</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg mt-6">Revenue by Month</h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-[400px] w-full border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-gray-900">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-2 border-b font-semibold text-left">Month</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {monthlyRevenue.map((row, idx) => (
              <tr key={row.month} className={idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                <td className="px-4 py-2 border-b">{row.month}</td>
                <td className="px-4 py-2 border-b">${row.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg mt-6">Revenue by Day</h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-[400px] w-full border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-gray-900">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-2 border-b font-semibold text-left">Day</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {dailyRevenue.map((row, idx) => (
              <tr key={row.day} className={idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                <td className="px-4 py-2 border-b">{row.day}</td>
                <td className="px-4 py-2 border-b">${row.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Invoice Form */}
      <h2 className="text-lg mt-8">Create Custom Invoice</h2>
      <form action={createCustomInvoiceAction} className="flex gap-2 mt-2 mb-6 items-end">
        <input name="customer" placeholder="Customer" required className="border px-2 py-1 rounded" />
        <input name="total" type="number" step="0.01" placeholder="Total" required className="border px-2 py-1 rounded w-24" />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Create Custom Invoice</button>
      </form>
    </main>
  );
}