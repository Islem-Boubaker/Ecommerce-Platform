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
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import OrdersTable from "../components/OrdersTable";

const stats = [
  {
    title: "Total Orders",
    value: "1,245",
    change: "+12%",
    icon: <ShoppingBag size={24} />,
  },
  {
    title: "Total Customers",
    value: "3,456",
    change: "+8%",
    icon: <Users size={24} />,
  },
  {
    title: "Total Products",
    value: "567",
    change: "+3%",
    icon: <Package size={24} />,
  },
  {
    title: "Revenue",
    value: "$12,345",
    change: "+15%",
    icon: <DollarSign size={24} />,
  },
];

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section) {
      setActiveSection(section);
    }
  }, [location]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Dashboard Overview
              </h2>
              <p className="text-gray-600">
                Welcome back! Here's what's happening with your store today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Sales Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#000000"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Recent Orders
              </h3>
              <OrdersTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
