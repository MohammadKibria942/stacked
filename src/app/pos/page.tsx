"use client";

import React, { useState } from "react";

const timeRanges = [
  { name: "Today", value: "today" },
  { name: "This Week", value: "this-week" },
  { name: "Last 7 Days", value: "last-7-days" },
  { name: "Last 30 Days", value: "last-30-days" },
  { name: "1 Year", value: "1-year" },
];

export default function POSPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");

  // For demo purposes, using static data
  const stats = {
    totalOrders: 0,
    avgOrderValue: "0.00",
    grossRevenue: "0.00",
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
              <p className="text-2xl font-semibold mt-1">{stats.totalOrders}</p>
              <p className="text-sm text-neutral-600 mt-1">from 0</p>
            </div>
            <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-sm">+-%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-neutral-600">Avg. order value</h3>
              <p className="text-2xl font-semibold mt-1">£{stats.avgOrderValue}</p>
              <p className="text-sm text-neutral-600 mt-1">from £0.00</p>
            </div>
            <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-sm">+-%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-neutral-600">Gross revenue</h3>
              <p className="text-2xl font-semibold mt-1">£{stats.grossRevenue}</p>
              <p className="text-sm text-neutral-600 mt-1">from £0.00</p>
            </div>
            <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-sm">+-%</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <h3 className="text-lg font-semibold mb-4">Revenue over time</h3>
        <div className="h-64 flex items-center justify-center text-neutral-500">
          Revenue chart will be displayed here
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent orders</h3>
          <button className="text-sm text-neutral-600 hover:text-neutral-900">View all</button>
        </div>
        <div className="flex items-center justify-center h-32 text-neutral-500">
          No orders to display
        </div>
      </div>
    </div>
  );
}
