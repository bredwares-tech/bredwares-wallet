"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    userCount: 0,
    totalAmount: 0,
    totalCount: 0,
    completedTotalAmount: 0,
    completedCount: 0,
    pendingTotalAmount: 0,
    pendingCount: 0,
  });
  interface Sale {
    id: string;
    full_name: string;
    email: string;
    payment_date: string;
    status: "completed" | "pending";
    amount: number;
  }

  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard statistics
        const statsResponse = await fetch("/api/dashboard/stats");
        if (!statsResponse.ok) {
          throw new Error("Failed to fetch dashboard statistics");
        }
        const stats = await statsResponse.json();
        setDashboardStats(stats);

        // Fetch recent sales
        const salesResponse = await fetch("/api/dashboard/recent-sales");
        if (!salesResponse.ok) {
          throw new Error("Failed to fetch recent sales");
        }
        const sales = await salesResponse.json();
        setRecentSales(sales);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format date function
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-2xl font-bold">Loading...</div>
            ) : error ? (
              <div className="text-sm text-red-500">Error loading data</div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {dashboardStats.totalAmount.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  All time total revenue
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Payments
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-2xl font-bold">Loading...</div>
            ) : error ? (
              <div className="text-sm text-red-500">Error loading data</div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {dashboardStats.completedTotalAmount.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardStats.completedCount} completed transactions
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-2xl font-bold">Loading...</div>
            ) : error ? (
              <div className="text-sm text-red-500">Error loading data</div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {dashboardStats.pendingTotalAmount.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardStats.pendingCount} pending transactions
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-2xl font-bold">Loading...</div>
            ) : error ? (
              <div className="text-sm text-red-500">Error loading data</div>
            ) : (
              <div className="text-2xl font-bold">
                {dashboardStats.userCount}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 w-full mt-8">
  <Card className="w-full">
    <CardHeader>
      <CardTitle>Recent Transitions</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {loading ? (
          <p>Loading recent sales...</p>
        ) : error ? (
          <p className="text-sm text-red-500">
            Error loading recent sales
          </p>
        ) : recentSales.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent sales found
          </p>
        ) : (
          recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {sale.full_name || "Unknown User"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {sale.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(sale.payment_date)}
                </p>
              </div>
              <div className="ml-auto">
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    sale.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {sale.status}
                </span>
                <p className="font-medium text-right mt-1">
                  {sale.amount.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </CardContent>
  </Card>
</div>

    </div>
  );
}
