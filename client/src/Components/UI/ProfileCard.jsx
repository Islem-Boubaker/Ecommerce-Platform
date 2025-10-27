import Avatar from "./Avatar";
export default function ProfileCard({ profile, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
      <Avatar
        avatar={profile.avatar}
        name={profile.fullName}
        onAvatarChange={(url) => onEdit({ ...profile, avatar: url })}
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-black">{profile.fullName}</h3>
        <p className="text-sm text-gray-600">{profile.email}</p>
      </div>
    </div>
  );
}