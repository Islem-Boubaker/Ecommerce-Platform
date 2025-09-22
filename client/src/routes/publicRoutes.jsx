import { Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import ProductDetails from "../Pages/ProductDetails";
import Category from "../Pages/Category";
import Cart from "../Pages/Cart";
export const PublicRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/products/:id" element={<ProductDetails />} />
    <Route path="/category" element={<Category />} />
    <Route path="/cart" element={<Cart />} />
  </Route> 
);
