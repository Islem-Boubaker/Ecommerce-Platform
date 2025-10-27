import React, { useState } from "react";
import ProfileCard from "../../Components/UI/ProfileCard";
import PersonalInfoSection from "../../Components/Admin/PersonalInfoSection";
import PasswordSection from "../../Components/Admin/PasswordSection";
import PreferencesSection from "../../Components/Admin/Preferences";

// Main Settings Component
export default function Settings() {
  const [profile, setProfile] = useState({
    fullName: "Islem Boubaker",
    email: "islemboubaker@example.com",
    phone: "+1 (555) 123-4567",
    address: "bechri souk lahad kebili",
    avatar: null,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
    orderUpdates: true,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileCard profile={profile} onEdit={setProfile} />
        <div className="md:col-span-2 space-y-6">
          <PersonalInfoSection profile={profile} onSave={setProfile} />
          <PasswordSection />
          <PreferencesSection
            preferences={preferences}
            onUpdate={setPreferences}
          />
        </div>
      </div>
    </div>
  );
}
