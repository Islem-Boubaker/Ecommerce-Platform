
// Password Section
import { useState, useEffect } from "react";
import InputField from "../UI/InputField";
import StatusMessage from "../UI/StatusMessage";
export default function PasswordSection() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (field, value) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!passwords.currentPassword || !passwords.newPassword) {
      setMessage("Please fill required fields");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setMessage("Password updated");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h4 className="text-lg font-semibold text-black mb-4">Change Password</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Current password"
          name="currentPassword"
          type="password"
          value={passwords.currentPassword}
          onChange={(e) => handleChange("currentPassword", e.target.value)}
        />
        <InputField
          label="New password"
          name="newPassword"
          type="password"
          value={passwords.newPassword}
          onChange={(e) => handleChange("newPassword", e.target.value)}
        />
        <InputField
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          value={passwords.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button onClick={handleSave} className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800">
          Save Password
        </button>
        <StatusMessage message={message} />
      </div>
    </div>
  );
}