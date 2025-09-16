import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/Auth/SingIn';
import AdminLayout from './Layouts/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard';
import ProductsManagement from './Pages/Admin/ProductsManagement';
import OrdersManagement from './Pages/Admin/OrdersManagement';
import CustomersManagement from './Pages/Admin/CustomersManagement';
import NotFound from './Pages/NotFound';
import Settings from './Pages/Admin/Settings';
import SingUp from './Pages/Auth/singup';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>

        {/* Auth pages */}
        <Route path="/singin" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
        {/* Admin pages with AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<ProductsManagement />} />
          <Route path="/dashboard/orders" element={<OrdersManagement />} />
          <Route path="/dashboard/customers" element={<CustomersManagement />} />
          <Route path="/dashboard/setting" element={<Settings />} />
        </Route>
        {/* 404 - Not Found */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
