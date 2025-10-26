import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingBag, Users, Package, DollarSign, Search } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Header from "../../Components/Admin/Header";
import Sidebar from "../../Components/Admin/Sidebar";
import StatCard from "../../Components/Admin/StatCard";
import OrdersTable from "../../Components/Admin/OrdersTable";
import CustomersManagement from "./CustomersManagement";
import Settings from "./Settings";
import ProductsManagement from "./ProductsManagement";
import OrdersManagement from "./OrdersManagement";

// Sample data for the dashboard
const stats = [
  {
    title: "Total Orders",
    value: "1,245",
    change: "+12%",
    icon: <ShoppingBag size={24} />,
  },
  {
    title: "Revenue",
    value: "$28,450",
    change: "+8.2%",
    icon: <DollarSign size={24} />,
  },
  {
    title: "Products",
    value: "845",
    change: "+5%",
    icon: <Package size={24} />,
  },
  {
    title: "Customers",
    value: "1,892",
    change: "+15.3%",
    icon: <Users size={24} />,
  },
];

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
];

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    date: "2023-05-15",
    status: "completed",
    total: 125.99,
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    date: "2023-05-14",
    status: "processing",
    total: 89.5,
  },
  {
    id: "#ORD-003",
    customer: "Robert Johnson",
    date: "2023-05-14",
    status: "pending",
    total: 215.75,
  },
  {
    id: "#ORD-004",
    customer: "Emily Davis",
    date: "2023-05-13",
    status: "completed",
    total: 56.2,
  },
  {
    id: "#ORD-005",
    customer: "Michael Brown",
    date: "2023-05-13",
    status: "cancelled",
    total: 145.99,
  },
];

export default function Dashboard() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || "dashboard";

  const renderContent = () => {
    switch (tab) {
      case "Products":
        return <ProductsManagement />;
      case "Orders":
        return <OrdersManagement />;
      case "Customers":
        return <CustomersManagement />;
      case "Settings":
        return <Settings />;
      default:
        return (
          <div className="space-y-6 m-20 h-auto w-auto">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Dashboard Overview
                </h1>
                <p className="text-gray-500">
                  Welcome back! Here's what's happening with your store today.
                </p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 w-64"
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  change={stat.change}
                />
              ))}
            </div>

            {/* Sales Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Sales Overview</h2>
                <select className="border border-gray-200 rounded-md px-3 py-1.5 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#000000"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-6">Recent Orders</h2>
                <OrdersTable orders={recentOrders} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64 ">
        <Header />
        <div className="overflow-x-auto mt-15">{renderContent()}</div>
      </div>
    </div>
  );
}
