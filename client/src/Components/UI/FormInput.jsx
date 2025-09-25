import { Eye, EyeOff } from "lucide-react";

export default function FormInput({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  autoComplete,
  showPasswordToggle = false,
  showPassword,
  onTogglePassword,
  ...props
}) {
  return (
    <div className="space-y-2">
      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-white transition-colors" />
        )}
        <input
          type={showPasswordToggle && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
          className={`w-full ${Icon ? "pl-12" : "pl-4"} ${
            showPasswordToggle ? "pr-12" : "pr-4"
          } py-4 bg-white/5 border ${
            error ? "border-white/50" : "border-white/20"
          } rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-white/60 focus:bg-white/10 transition-all duration-300`}
          {...props}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-white/70 text-sm ml-4">{error}</p>}
    </div>
  );
}
