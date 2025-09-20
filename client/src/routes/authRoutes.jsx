import { Route } from "react-router-dom";
import Login from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";

export const AuthRoutes = (
  <>
    <Route path="/signin" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
  </>


  
);
