"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OrderItem {
  name: string;
  price: string;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  status: "completed" | "pending"; // Added from orders/page.tsx
  timestamp: string; // Added from orders/page.tsx
  paymentStatus: "paid"; // Added
  total: number;
}

const timeRanges = [
  { name: "Today", value: "today" },
  { name: "This Week", value: "this-week" },
  { name: "Last 7 Days", value: "last-7-days" },
  { name: "Last 30 Days", value: "last-30-days" },
  { name: "1 Year", value: "1-year" },
];

export default function POSPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load orders from localStorage on component mount
    const loadOrders = () => {
      const savedOrders = localStorage.getItem("stacked_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      setLoading(false);
    };

    loadOrders();

    // Set up event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "stacked_orders") {
        const newOrders = e.newValue ? JSON.parse(e.newValue) : [];
        setOrders(newOrders);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getFilteredOrders = useMemo(() => {
    if (!orders.length) return [];

    const now = new Date();
    let startDate = new Date(0); // Default to a very early date to include all orders

    // Set the time part of 'now' to the end of the day for comparisons
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    switch (selectedTimeRange) {
      case 'today':
        startDate = new Date(now);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'this-week':
        startDate = new Date(now);
        const dayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)
        startDate.setDate(now.getDate() - dayOfWeek); // Assuming week starts on Sunday
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'last-7-days':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 6); // 6 days ago to include today as the 7th day
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'last-30-days':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 29);
        startDate.setHours(0, 0, 0, 0);
        break;
      case '1-year':
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        startDate.setHours(0, 0, 0, 0);
        break;
      default: // Should not happen with defined timeRanges, but as a fallback, include all
        return [...orders].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }
    return orders
      .filter(order => {
        const orderDate = new Date(order.timestamp);
        return orderDate >= startDate && orderDate <= endOfToday;
      })
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [orders, selectedTimeRange]);

  const calculateStats = (ordersToCalculate: Order[]) => {
    const totalOrders = ordersToCalculate.length;
    const grossRevenue = ordersToCalculate.reduce((sum, order) => sum + order.total, 0);
    const avgOrderValue = totalOrders > 0 ? grossRevenue / totalOrders : 0;
    return {
      totalOrders,
      avgOrderValue: avgOrderValue.toFixed(2),
      grossRevenue: grossRevenue.toFixed(2),
    };
  };

  const stats = calculateStats(getFilteredOrders);

  const prepareChartData = (ordersForChart: Order[]) => {
    if (!ordersForChart || ordersForChart.length === 0) return [];
    let cumulativeRevenue = 0;
    return ordersForChart.map((order) => {
      cumulativeRevenue += order.total;
      return {
        name: new Date(order.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        revenue: parseFloat(cumulativeRevenue.toFixed(2)),
        orderId: order.id, // For tooltip
      };
    });
  };

  const chartData = prepareChartData(getFilteredOrders);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded border border-gray-200 text-sm">
          <p className="font-semibold">{`Time: ${label}`}</p>
          <p className="text-blue-600">{`Cumulative Revenue: £${payload[0].value.toFixed(2)}`}</p>
          {payload[0].payload.orderId && <p className="text-xs text-gray-500 mt-1">{`Order ID: ${payload[0].payload.orderId.substring(0,12)}...`}</p>}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>
    );
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Stacked</h1>
        <div className="flex gap-4">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                selectedTimeRange === range.value
                  ? "bg-neutral-200 text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
              onClick={() => setSelectedTimeRange(range.value)}
            >
              {range.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-neutral-600">Total orders</h3>
              <p className="text-2xl font-semibold mt-1">{stats.totalOrders}</p>{/* Display calculated total orders */}
              <p className="text-sm text-neutral-600 mt-1">from 0</p>
            </div>
            <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-sm">+-%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-neutral-600">Avg. order value</h3>
              <p className="text-2xl font-semibold mt-1">£{stats.avgOrderValue}</p>{/* Display calculated average order value */}
              <p className="text-sm text-neutral-600 mt-1">from £0.00</p>
            </div>
            <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-sm">+-%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-neutral-600">Gross revenue</h3>
              <p className="text-2xl font-semibold mt-1">£{stats.grossRevenue}</p>{/* Display calculated gross revenue */}
              <p className="text-sm text-neutral-600 mt-1">from £0.00</p>
            </div>
            <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-sm">+-%</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <h3 className="text-lg font-semibold mb-4">Revenue over time</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                stroke="#666" 
                fontSize={12} 
                tick={{ dy: 5 }}
                interval={chartData.length > 20 ? Math.floor(chartData.length / 10) : 0} // Adjust interval to prevent overlap
              />
              <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `£${value}`} tick={{ dx: -5 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} name="Cumulative Revenue" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-neutral-500">
            No revenue data to display for the selected period.
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent orders</h3>
          <Link href="/pos/orders" className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline">
            View all
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-neutral-500">
            No orders to display
          </div>
        ) : (
          <ul className="space-y-4">
            {getFilteredOrders.slice(-5).reverse().map((order) => ( // Displaying up to 5 most recent orders from the filtered list
              <li key={order.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-neutral-800">Order ID: {order.id.substring(0, 12)}...</p>
                    <p className="text-xs text-neutral-500">
                      {new Date(order.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-semibold text-neutral-800">
                      £{order.total.toFixed(2)}
                    </p>
                    <span
                      className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
            {getFilteredOrders.length > 5 && (
              <li className="text-center text-sm text-neutral-500 pt-2">
                And {getFilteredOrders.length - 5} more orders in this period.
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
