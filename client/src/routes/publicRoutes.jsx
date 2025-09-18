import { Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import ProductDetails from "../Pages/ProductDetails";

export const PublicRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/products/:id" element={<ProductDetails />} />
  </Route>
);
