"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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

  const StatCard = ({ title, value, icon, subtext }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <>
            <Skeleton className="h-7 w-1/2 mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </>
        ) : error ? (
          <div className="text-sm text-red-500">Error loading data</div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {subtext && (
              <p className="text-xs text-muted-foreground">{subtext}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={dashboardStats.totalAmount.toFixed(2)}
          // icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          subtext="All time total revenue"
        />
        <StatCard
          title="Completed Payments"
          value={dashboardStats.completedTotalAmount.toFixed(2)}
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
          subtext={`${dashboardStats.completedCount} completed transactions`}
        />
        <StatCard
          title="Pending Payments"
          value={dashboardStats.pendingTotalAmount.toFixed(2)}
          icon={<Clock className="h-4 w-4 text-yellow-500" />}
          subtext={`${dashboardStats.pendingCount} pending transactions`}
        />
        <StatCard
          title="Total Users"
          value={dashboardStats.userCount}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 w-full mt-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="flex items-center space-y-2">
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                      <div className="ml-auto text-right">
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  ))
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
