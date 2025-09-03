

import { getRevenueSummary } from './action';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/revenue/card";

export default async function RevenueCard() {
  // Example: show last 30 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);
  const result = await getRevenueSummary(startDate, endDate);

  if (!result.success) {
    return (
      <Card className="p-6">
        <div className="text-red-500">Failed to load revenue data</div>
      </Card>
    );
  }

  const { revenue, totalRevenue } = result;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <div className="h-4 w-4 text-green-600">💰</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            From {revenue.length} records
          </p>
        </CardContent>
      </Card>
      {/* Add more cards for collection rate, outstanding, etc. as needed */}
      {/* Recent Activity */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {revenue.slice(0, 5).map((rev: any) => (
              <div key={rev.id} className="flex justify-between items-center py-1">
                <div>
                  <div className="font-medium text-sm">{rev.source || 'No source'}</div>
                  <div className="text-xs text-muted-foreground">{rev.description || 'No description'}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">${rev.amount.toFixed(2)}</div>
                  <div className="text-xs text-green-600">Date: {new Date(rev.paymentDate).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
