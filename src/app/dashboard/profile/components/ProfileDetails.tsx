import ProfilePictureUploader from "./ProfilePictureUploader";

export default function ProfileDetails({ profile }: { profile: any }) {
  return (
    <div className="bg-white/30 dark:bg-green-900/30 backdrop-blur-md p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-green-800 dark:text-green-100">
        Profile Details
      </h2>

      {/* Profile Picture Uploader */}
      <ProfilePictureUploader
        userId={profile?.id}
        currentLogoUrl={profile?.logo_url || null}
      />

      <ul className="mt-4 flex-col md:flex-row space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          <strong>First Name:</strong> <span className="text-lightmode-text-color dark:text-darkmode-text-color">
            {profile?.first_name || "Not provided"}</span>
        </li>
        <li>
          <strong>Last Name:</strong> <span className="text-lightmode-text-color dark:text-darkmode-text-color">{profile?.last_name || "Not provided"}</span>
        </li>
        <li>
          <strong>Email:</strong> <span className="text-lightmode-text-color dark:text-darkmode-text-color">{profile?.email || "Not provided"}</span>
        </li>
      </ul>
    </div>
  );
}
