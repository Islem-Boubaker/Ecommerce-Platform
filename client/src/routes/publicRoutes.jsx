import { Route } from "react-router-dom";
import MainLayout from "../shared/components/MainLayout";
import Home from "../shared/pages/Home";
import ProductDetails from "../features/products/pages/ProductDetails";
import Category from "../features/products/pages/Category";
import Cart from "../features/cart/pages/Cart";
export const PublicRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/products/:id" element={<ProductDetails />} />
    <Route path="/category" element={<Category />} />
    <Route path="/Cart" element={<Cart />} />
  </Route> 
);
