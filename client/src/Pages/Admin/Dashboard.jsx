import React from "react";
import HeaderAdmin from "../../Components/Admin/HeaderAdmin.jsx";
import { useLocation } from "react-router-dom";
import CustomersManagement from "./CustomersManagement.jsx";
import Settings from "./Settings.jsx";
import OrdersManagement from "./OrdersManagement.jsx";
import ProductsManagement from "./ProductsManagement.jsx";

export default function Dashboard() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || "dashboard";

  return (
    <div className="flex min-h-screen m-10">
      <HeaderAdmin />
      <main className="flex-1 p-6 bg-gray-100">
        {tab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
            <p>Welcome to the admin dashboard</p>
          </div>
        )}
        {tab === "products" && <ProductsManagement />}
        {tab === "orders" && <OrdersManagement />}
        {tab === "customers" && <CustomersManagement />}
        {tab === "settings" && <Settings />}
      </main>
    </div>
  );
}
