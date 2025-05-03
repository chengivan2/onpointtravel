import Image from "next/image";

export default function ProfileHeader({ profile }: { profile: any }) {
  return (
    <div className="flex items-center space-x-4 bg-white/30 dark:bg-green-900/30 backdrop-blur-md p-6 rounded-xl shadow-lg">
      <Image
        src={profile?.avatar_url || "/default-avatar.png"}
        alt="User Avatar"
        width={80}
        height={80}
        className="rounded-full"
      />
      <div>
        <h1 className="text-2xl font-bold text-green-800 dark:text-green-100">
          {profile?.first_name} {profile?.last_name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{profile?.email}</p>
      </div>
    </div>
  );
}