import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoutes } from "./publicRoutes";
import { AuthRoutes } from "./authRoutes";
import { AdminRoutes } from "./AdminRoute";
import NotFound from "../Pages/NotFound";
import { useSelector } from "react-redux";

export default function AppRoutes() {
  const { user } = useSelector((state) => state.user);
  return (
    <Routes>
      {PublicRoutes}
      {AuthRoutes}
      {user?.isAdmin && AdminRoutes}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
