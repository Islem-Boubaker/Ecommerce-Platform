// import React, { useState } from "react";

// import { User, Mail, Lock, Chrome, Facebook } from "lucide-react";
// import PropTypes from "prop-types";

// export const SignUpForm = ({ onSwitchToSignIn }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};

//     // Name
//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     } else if (formData.name.trim().length < 2) {
//       newErrors.name = "Name must be at least 2 characters";
//     }

//     // Email
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     // Password
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//       newErrors.password =
//         "Password must contain uppercase, lowercase, and number";
//     }

//     // Confirm Password
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       console.log("Sign up:", formData);
//     }, 2000);
//   };

//   const handleInputChange = (field) => (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: e.target.value,
//     }));

//     // Clear error as user types
//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: undefined,
//       }));
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="text-center space-y-2">
//         <h2 className="text-2xl font-semibold text-foreground">Create Account</h2>
//         <p className="text-muted-foreground">
//           Join us and start your fashion journey
//         </p>
//       </div>

//       {/* Social Login */}
//       <div className="space-y-3">
//         <SocialButton
//           provider="google"
//           icon={<Chrome size={18} />}
//           onClick={() => console.log("Google sign up")}
//         >
//           Continue with Google
//         </SocialButton>

//         <SocialButton
//           provider="facebook"
//           icon={<Facebook size={18} />}
//           onClick={() => console.log("Facebook sign up")}
//         >
//           Continue with Facebook
//         </SocialButton>
//       </div>

//       {/* Divider */}
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t border-border" />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-background px-2 text-muted-foreground">
//             Or create account with email
//           </span>
//         </div>
//       </div>

//       {/* Sign Up Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <InputField
//           label="Full Name"
//           type="text"
//           placeholder="Enter your full name"
//           value={formData.name}
//           onChange={handleInputChange("name")}
//           error={errors.name}
//           icon={<User size={18} />}
//           required
//         />

//         <InputField
//           label="Email Address"
//           type="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={handleInputChange("email")}
//           error={errors.email}
//           icon={<Mail size={18} />}
//           required
//         />

//         <InputField
//           label="Password"
//           type="password"
//           placeholder="Create a strong password"
//           value={formData.password}
//           onChange={handleInputChange("password")}
//           error={errors.password}
//           icon={<Lock size={18} />}
//           required
//         />

//         <InputField
//           label="Confirm Password"
//           type="password"
//           placeholder="Confirm your password"
//           value={formData.confirmPassword}
//           onChange={handleInputChange("confirmPassword")}
//           error={errors.confirmPassword}
//           icon={<Lock size={18} />}
//           required
//         />

//         <div className="flex items-start space-x-2">
//           <input
//             type="checkbox"
//             id="terms"
//             className="mt-1 rounded border-border text-primary focus:ring-ring focus:ring-offset-0"
//             required
//           />
//           <label
//             htmlFor="terms"
//             className="text-sm text-muted-foreground leading-relaxed"
//           >
//             I agree to the{" "}
//             <button type="button" className="text-primary hover:underline">
//               Terms of Service
//             </button>{" "}
//             and{" "}
//             <button type="button" className="text-primary hover:underline">
//               Privacy Policy
//             </button>
//           </label>
//         </div>

//         <Button type="submit" className="w-full h-12" disabled={isLoading}>
//           {isLoading ? "Creating Account..." : "Create Account"}
//         </Button>
//       </form>

//       {/* Switch to Sign In */}
//       <p className="text-center text-sm text-muted-foreground">
//         Already have an account?{" "}
//         <button
//           type="button"
//           onClick={onSwitchToSignIn}
//           className="text-primary hover:underline font-medium transition-smooth"
//         >
//           Sign In
//         </button>
//       </p>
//     </div>
//   );
// };

// SignUpForm.propTypes = {
//   onSwitchToSignIn: PropTypes.func.isRequired,
// };

import React from 'react'

export default function SignUp() {
  return (
    <div>SignUp</div>
  )
}
