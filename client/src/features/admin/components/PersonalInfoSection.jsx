import { useState, useEffect } from "react";
import InputField from "../../shared/components/InputField";
import StatusMessage from "../../shared/components/StatusMessage";
export default function PersonalInfoSection({ profile, onSave }) {
  const [form, setForm] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    setForm(profile);
  }, [profile]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(form);
    setEditing(false);
    setMessage("Profile saved");
  };

  const handleCancel = () => {
    setForm(profile);
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-black">
          Personal Information
        </h4>
        <div className="text-sm text-gray-500">
          {editing ? "Editing" : "View"}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <InputField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800"
        >
          Save Changes
        </button>
        <button
          onClick={handleCancel}
          className="bg-white border border-gray-300 text-black rounded-md px-4 py-2 hover:bg-gray-50"
        >
          Cancel
        </button>
        <StatusMessage message={message} />
      </div>
    </div>
  );
}
