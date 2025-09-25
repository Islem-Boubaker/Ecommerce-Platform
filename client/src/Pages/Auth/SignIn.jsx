import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import FormInput from "../../Components/UI/FormInput";
import AuthHeader from "../../Components/UI/AuthHeader";
import ErrorDisplay from "../../Components/UI/ErrorsDisplay";
import SubmitButton from "../../Components/UI/SubmitButton";
import RememberMeSection from "../../Components/UI/RememberMeSection";
import Authtoggle from "../../Components/UI/Authtoggle";

export default function SignIn() {
  const [IsSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (IsSignUp && !formData.name) {
      newErrors.name = "Name is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock success
      console.log("Form submitted:", formData);
      alert(`${IsSignUp ? "Account created" : "Signed in"} successfully!`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
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
            {/* Name Field - Only for Sign Up */}
            {IsSignUp && (
              <FormInput
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={handleInputChange("name")}
                error={errors.name}
                icon={User}
                autoComplete="name"
              />
            )}

            {/* Email Field */}
            <FormInput
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange("email")}
              error={errors.email}
              icon={Mail}
              autoComplete="email"
            />

            {/* Password Field */}
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

            {/* Remember Me & Forgot Password - Only for Sign In */}
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
