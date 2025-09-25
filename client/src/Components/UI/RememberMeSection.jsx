
export default function  RememberMeSection ({ rememberMe, onRememberMeChange }){
    return (
      <div className="flex items-center justify-between py-2">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={onRememberMeChange}
            className="w-4 h-4 rounded border-white/20 bg-white/5 text-white focus:ring-white/50 focus:ring-offset-0"
          />
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
            Remember me
          </span>
        </label>
        <button
          type="button"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Forgot password?
        </button>
      </div>
    );
  };