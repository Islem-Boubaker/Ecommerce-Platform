import { ArrowRight } from "lucide-react";

export default function SubmitButton({ loading, isSignUp, ...props }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group w-full py-4 px-6 bg-white text-black font-medium rounded-2xl transition-all duration-300 hover:bg-gray-100 disabled:bg-white/50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl disabled:shadow-none transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center space-x-3"
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-3">
          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
          <span>{isSignUp ? "Creating Account..." : "Signing In..."}</span>
        </div>
      ) : (
        <>
          <span>{isSignUp ? "Create Account" : "Sign In"}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}
