export default function  Authtoggle({ isSignUp, onToggle }){
    return (
      <div className="mt-8 text-center">
        <p className="text-gray-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="text-white hover:text-gray-300 font-medium transition-colors relative group"
            onClick={onToggle}
          >
            {isSignUp ? "Sign In" : "Create Account"}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </button>
        </p>
      </div>
    );
  };