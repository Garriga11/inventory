import prisma from "@/lib/prisma";
import { createInvoiceAction, markInvoicePaidAction } from "./action";

export default async function PartsPage() {
  const parts = await prisma.part.findMany();
  const invoices = await prisma.invoice.findMany({
    include: { items: { include: { part: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Parts</h1>
      <table className="border mt-2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>${p.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
      <ul>
        {invoices.map((inv) => (
          <li key={inv.id} className="border p-2 mt-2">
            <div>
              {inv.items.map((item) => (
                <div key={item.id}>
                  {item.quantity} × {item.part.name} = ${(item.price * item.quantity).toFixed(2)}
                </div>
              ))}
            </div>
            <div>Total: ${inv.total.toFixed(2)}</div>
            <div>Status: {inv.paid ? "Paid" : "Unpaid"}</div>
            {!inv.paid && (
              <form
                action={async () => {
                  "use server";
                  await markInvoicePaidAction(inv.id);
                }}
              >
                <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded mt-2">Mark Paid</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}