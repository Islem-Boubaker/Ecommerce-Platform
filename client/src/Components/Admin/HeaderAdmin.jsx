import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function HeaderAdmin() {
  const menuItems = [
    { name: "dashboard", label: "Dashboard" },
    { name: "products", label: "Products" },
    { name: "orders", label: "Orders" },
    { name: "customers", label: "Customers" },
    { name: "settings", label: "Settings" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("tab") || "dashboard";

  const handleChangeTab = (tabName) => {
    const params = new URLSearchParams(location.search);
    params.set("tab", tabName);
    navigate({ search: params.toString() });
  };

  return (
    <aside className="w-64 bg-black text-white h-screen p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleChangeTab(item.name)}
                className={`w-full text-left px-4 py-2 rounded transition ${
                  activeTab === item.name
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
