import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoutes } from "./publicRoutes";
import { AuthRoutes } from "./authRoutes";
import { AdminRoutes } from "./AdminRoute";
import NotFound from "../Pages/NotFound";
import { useSelector } from "react-redux";

export default function AppRoutes() {
  const userIsAdmin = useSelector((state) => state.user.currentUser?.role);
 
  return (
    <Routes>
      {PublicRoutes}
      {AuthRoutes}
      {userIsAdmin === "admin" && AdminRoutes}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
