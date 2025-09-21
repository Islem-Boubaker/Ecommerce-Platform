// import React, { useState } from "react";

// import { Mail, Lock, Chrome, Facebook } from "lucide-react";

// export const SignInForm = ({ onSwitchToSignUp }) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};

//     // Email validation
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       console.log("Sign in:", formData);
//     }, 2000);
//   };

//   const handleInputChange = (field) => (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: e.target.value,
//     }));

//     // Clear error when user starts typing
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
//         <h2 className="text-2xl font-semibold text-foreground">Welcome Back</h2>
//         <p className="text-muted-foreground">
//           Sign in to your account to continue shopping
//         </p>
//       </div>

//       {/* Social Login Options */}
//       <div className="space-y-3">
//         <SocialButton
//           provider="google"
//           icon={<Chrome size={18} />}
//           onClick={() => console.log("Google sign in")}
//         >
//           Continue with Google
//         </SocialButton>

//         <SocialButton
//           provider="facebook"
//           icon={<Facebook size={18} />}
//           onClick={() => console.log("Facebook sign in")}
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
//             Or continue with email
//           </span>
//         </div>
//       </div>

//       {/* Sign In Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
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
//           placeholder="Enter your password"
//           value={formData.password}
//           onChange={handleInputChange("password")}
//           error={errors.password}
//           icon={<Lock size={18} />}
//           required
//         />

//         <div className="flex items-center justify-between">
//           <label className="flex items-center space-x-2 cursor-pointer">
//             <input
//               type="checkbox"
//               className="rounded border-border text-primary focus:ring-ring focus:ring-offset-0"
//             />
//             <span className="text-sm text-muted-foreground">Remember me</span>
//           </label>

//           <button
//             type="button"
//             className="text-sm text-primary hover:underline transition-smooth"
//             onClick={() => console.log("Forgot password")}
//           >
//             Forgot Password?
//           </button>
//         </div>

//         <Button type="submit" className="w-full h-12" disabled={isLoading}>
//           {isLoading ? "Signing In..." : "Sign In"}
//         </Button>
//       </form>

//       {/* Switch to Sign Up */}
//       <p className="text-center text-sm text-muted-foreground">
//         Don&apos;t have an account?{" "}
//         <button
//           type="button"
//           onClick={onSwitchToSignUp}
//           className="text-primary hover:underline font-medium transition-smooth"
//         >
//           Create an Account
//         </button>
//       </p>
//     </div>
//   );
// };

import React from 'react'

export default function SignIn() {
  return (
    <div>SignIn</div>
  )
}
