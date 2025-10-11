import { Route } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";
import Dashboard from "../Pages/Admin/Dashboard";
import ProductsManagement from "../Pages/Admin/ProductsManagement";
import OrdersManagement from "../Pages/Admin/OrdersManagement";
import CustomersManagement from "../Pages/Admin/CustomersManagement";
import Settings from "../Pages/Admin/Settings";
export const AdminRoutes = (
  <Route element={<AdminLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/dashboard/products" element={<ProductsManagement />} />
    <Route path="/dashboard/orders" element={<OrdersManagement />} />
    <Route path="/dashboard/customers" element={<CustomersManagement />} />
    <Route path="/dashboard/settings" element={<Settings />} />
  </Route>
);
