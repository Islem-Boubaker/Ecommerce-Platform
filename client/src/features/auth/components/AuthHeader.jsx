
export default function AuthHeader({ isSignUp }){
    return (
      <div className="text-center space-y-6 mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl">
          <div className="w-8 h-8 bg-black rounded-lg"></div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-light text-white">
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>
          <p className="text-gray-400">
            {isSignUp 
              ? "Join us and start your journey" 
              : "Welcome back, please sign in"}
          </p>
        </div>
      </div>
    );
  };