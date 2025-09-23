import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  SignInStart,
  SignInSuccess,
  SignInFailure,
} from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [IsSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  /** ✅ Validate form fields */
  const validateForm = () => {
    const newErrors = {};

    if (IsSignUp && !formData.name) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** ✅ Handle input changes */
  const handleInputChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  /** ✅ Submit handler */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(SignInStart());

    try {
      const url = IsSignUp
        ? "http://localhost:5000/auth/login"
        : "http://localhost:5000/auth/register";

      // send only needed fields
      const payload = IsSignUp
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }

      const data = await response.json();

      // Save user & token to Redux/localStorage
      dispatch(SignInSuccess(data.user));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirect after success
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      dispatch(SignInFailure(err.message));
    }
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen p-8 gap-8 bg-gray-200 text-black">
      {/* Left Side */}
      <div className="flex-1 order-1 bg-white h-full p-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center mb-10">
          Discover Your Perfect Style
        </h1>
        <div className="text-lg text-center">
          Curated fashion collection for the modern lifestyle.
          <br />
          Premium quality, sustainable materials, and timeless designs that
          define elegance.
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="order-2 w-full h-full max-w-md mx-auto lg:mx-0">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-black">
              {IsSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-black">
              {IsSignUp ? "Sign up" : "Sign in"} to continue your journey
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-2 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            {IsSignUp && (
              <div className="space-y-1">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    autoComplete="name"
                    onChange={handleInputChange("name")}
                    className={`w-full pl-10 pr-4 py-3 bg-white border ${
                      errors.name ? "border-red-400" : "border-gray-300"
                    } rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:bg-white transition-all duration-300`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm ml-1">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  autoComplete="email"
                  onChange={handleInputChange("email")}
                  className={`w-full pl-10 pr-4 py-3 bg-white border ${
                    errors.email ? "border-red-400" : "border-gray-300"
                  } rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:bg-white transition-all duration-300`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  autoComplete="current-password"
                  onChange={handleInputChange("password")}
                  className={`w-full pl-10 pr-12 py-3 bg-white border ${
                    errors.password ? "border-red-400" : "border-gray-300"
                  } rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:bg-white transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-black transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm ml-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            {!IsSignUp && (
              <div className="flex items-center justify-between py-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange("rememberMe")}
                    className="w-4 h-4 rounded border-gray-300 bg-white text-black focus:ring-gray-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-black">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-black hover:text-black transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-black hover:bg-white hover:text-black disabled:bg-gray-300 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 transform disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                  <span>{IsSignUp ? "Signing Up..." : "Signing In..."}</span>
                </div>
              ) : IsSignUp ? (
                "Sign Up"
              ) : (
                "Sign In"
              )}
            </button>

            {/* Error from Redux */}
            {error && (
              <p className="text-red-400 text-center text-sm mt-2">{error}</p>
            )}
          </form>

          {/* Toggle Link */}
          <div className="mt-8 text-center">
            <p className="text-black">
              {IsSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
              <button
                type="button"
                className="text-black hover:text-black font-medium transition-colors underline cursor-pointer"
                onClick={() => setIsSignUp(!IsSignUp)}
              >
                {IsSignUp ? "Sign In" : "Create Account"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
