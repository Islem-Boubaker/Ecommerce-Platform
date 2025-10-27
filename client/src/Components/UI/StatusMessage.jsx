export default function StatusMessage({ message }) {
  if (!message) return null;
  return <div className="text-sm text-gray-600">{message}</div>;
}
