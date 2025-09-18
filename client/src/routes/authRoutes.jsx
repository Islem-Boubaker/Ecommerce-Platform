import { Route } from "react-router-dom";
import Login from "../Pages/Auth/SingIn";
import SignUp from "../Pages/Auth/singup";

export const AuthRoutes = (
  <>
    <Route path="/singin" element={<Login />} />
    <Route path="/singup" element={<SignUp />} />
  </>
);
