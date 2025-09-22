import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  SignInStart,
  SignInSuccess,
  SignInFailure,
} from "../../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user); // ✅
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Start sign-in (Redux)
    dispatch(SignInStart());

    // Simulate API call (replace later with real API)
    setTimeout(() => {
      try {
        const mockUser = { id: 1, email: formData.email };
        dispatch(SignInSuccess(mockUser));
        console.log("Sign in:", mockUser);
      } catch (err) {
        dispatch(SignInFailure("Failed to sign in. Please try again."));
        console.log(err)
      }
    }, 1200);
  };

  const handleInputChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen p-8 gap-8 bg-amber-950">
      {/* Left Side */}
      <div className="flex-1 order-1 bg-black h-full p-8 flex flex-col items-center justify-center text-white">
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

      {/* Right Side - Sign In Form */}
      <div className="w-full max-w-md mx-auto lg:mx-0">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-purple-200">Sign in to continue your journey</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 text-red-200 px-4 py-2 text-sm">
              {error}
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 group"
            >
              {/* Google Icon */}
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 group"
            >
              {/* Facebook Icon */}
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent px-4 text-purple-200">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  autoComplete="email"
                  onChange={handleInputChange("email")}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                    errors.email ? "border-red-400" : "border-white/20"
                  } rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  autoComplete="current-password"
                  onChange={handleInputChange("password")}
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 border ${
                    errors.password ? "border-red-400" : "border-white/20"
                  } rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between py-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange("rememberMe")}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                />
                <span className="text-sm text-purple-200">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-purple-300 hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 transform disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Error from Redux */}
            {error && (
              <p className="text-red-400 text-center text-sm mt-2">{error}</p>
            )}
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-purple-200">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-purple-400 hover:text-white font-medium transition-colors"
              >
                Create an Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
