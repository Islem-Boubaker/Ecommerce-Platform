import React, { useState } from "react";
import { User, Mail, Lock, Phone } from "lucide-react";
import FormInput from "../Components/UI/FormInput";
import AuthHeader from "../Components/UI/AuthHeader";
import ErrorDisplay from "../Components/UI/ErrorsDisplay";
import SubmitButton from "../Components/UI/SubmitButton";
import RememberMeSection from "../Components/UI/RememberMeSection";
import Authtoggle from "../Components/UI/Authtoggle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  SignInStart,
  SignInSuccess,
  SignInFailure,
} from "../redux/user/userSlice"; // adjust path if needed

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [IsSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};

    if (IsSignUp && !formData.name) {
      newErrors.name = "Name is required";
    }

    if (IsSignUp && !formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (
      IsSignUp &&
      formData.phone &&
      !/^[0-9+\-\s()]+$/.test(formData.phone)
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Input handler
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

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    dispatch(SignInStart()); // 🔥 tell Redux we're loading

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const requestData = IsSignUp
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(
        `${apiUrl}/auth/${IsSignUp ? "register" : "login"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      if (data.user) {
        dispatch(SignInSuccess(data.user)); // 🔥 Save user in Redux
      }

      console.log(`${IsSignUp ? "Account created" : "Signed in"} successfully!`);
      navigate(-1);
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Something went wrong");
      dispatch(SignInFailure(err.message)); // 🔥 Save error in Redux
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAuth = () => {
    setIsSignUp(!IsSignUp);
    setErrors({});
    setError("");
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <AuthHeader isSignUp={IsSignUp} />
          <ErrorDisplay error={error} />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Phone - SignUp only */}
            {IsSignUp && (
              <div className="flex flex-col gap-4 md:flex-row">
                <FormInput
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  error={errors.name}
                  icon={User}
                  autoComplete="name"
                />
                <FormInput
                  type="text"
                  placeholder="Your number"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  error={errors.phone}
                  icon={Phone}
                  autoComplete="tel"
                />
              </div>
            )}

            {/* Email */}
            <FormInput
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange("email")}
              error={errors.email}
              icon={Mail}
              autoComplete="email"
            />

            {/* Password */}
            <FormInput
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange("password")}
              error={errors.password}
              icon={Lock}
              autoComplete={IsSignUp ? "new-password" : "current-password"}
              showPasswordToggle={true}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            {!IsSignUp && (
              <RememberMeSection
                rememberMe={formData.rememberMe}
                onRememberMeChange={handleInputChange("rememberMe")}
              />
            )}

            <SubmitButton loading={loading} isSignUp={IsSignUp} />
          </form>

          <Authtoggle isSignUp={IsSignUp} onToggle={handleToggleAuth} />
        </div>
      </div>
    </div>
  );
}
