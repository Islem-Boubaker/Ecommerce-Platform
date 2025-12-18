import { useRef } from "react";

export default function Avatar({ avatar, name, onAvatarChange }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onAvatarChange(url);
    }
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="relative">
      <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {avatar ? (
          <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl font-semibold text-gray-600">{initials}</span>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute -bottom-2 right-0 transform translate-x-1/4 bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-gray-50"
      >
        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
}

