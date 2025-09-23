import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

export default function PrivateRoutes() {
  const userisadmin = useSelector((state) => state.user.currentUser);
  console.log(userisadmin);
  return  userisadmin && userisadmin.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
}
