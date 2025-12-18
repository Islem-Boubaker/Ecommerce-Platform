import ToggleSwitch from "./ToggleSwitch";
export default function PreferenceItem({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-black">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );
}
