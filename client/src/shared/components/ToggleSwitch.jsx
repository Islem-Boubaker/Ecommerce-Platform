
export default function ToggleSwitch({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-black peer-focus:ring-2 peer-focus:ring-gray-400 transition-colors"></div>
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transform transition-transform"></div>
    </label>
  );
}
