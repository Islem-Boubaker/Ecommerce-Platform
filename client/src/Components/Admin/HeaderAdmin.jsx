import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderAdmin() {
  // 1️⃣ Define your sidebar menu as an array of objects
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Products', path: '/dashboard/products' },
    { name: 'Orders', path: '/dashboard/orders' },
    { name: 'Customers', path: '/dashboard/customers' },
    { name: 'Setting', path: '/dashboard/setting' },
    { name: 'Analytics', path: '/dashboard/analytics' },
    { name: 'Logout', path: '/' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      {/* 2️⃣ Render links dynamically with .map() */}
      <nav>
        <ul className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="hover:bg-gray-700 rounded px-2 py-1 transition"
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
