import { useState, useEffect } from "react";
import PreferenceItem from "../../shared/components/PreferenceItem";
import StatusMessage from "../../shared/components/StatusMessage";
export default function Preferences({ preferences, onUpdate }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleToggle = (key) => {
    onUpdate({ ...preferences, [key]: !preferences[key] });
    setMessage("Preferences updated");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h4 className="text-lg font-semibold text-black mb-4">Preferences</h4>
      <div className="space-y-4">
       
        <PreferenceItem
          title="Email notifications"
          description="Receive promotional emails"
          checked={preferences.emailNotifications}
          onChange={() => handleToggle("emailNotifications")}
        />
        <PreferenceItem
          title="Order updates"
          description="Status updates for orders"
          checked={preferences.orderUpdates}
          onChange={() => handleToggle("orderUpdates")}
        />
      </div>
      {message && <StatusMessage message={message} />}
    </div>
  );
}
