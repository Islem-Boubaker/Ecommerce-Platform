import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoutes } from "./publicRoutes";
import { AuthRoutes } from "./authRoutes";
import { AdminRoutes } from "./AdminRoutes";
import NotFound from "../Pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {PublicRoutes}
      {AuthRoutes}
      {AdminRoutes}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
