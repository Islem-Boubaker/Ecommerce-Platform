import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/Auth/Login';
import AdminLayout from './Layouts/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard';
import NotFound from './Pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />

        {/* Admin pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 - Not Found */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
