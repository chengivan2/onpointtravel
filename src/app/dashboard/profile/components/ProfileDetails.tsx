export default function ProfileDetails({ profile }: { profile: any }) {
    return (
      <div className="bg-white/30 dark:bg-green-900/30 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-green-800 dark:text-green-100">
          Profile Details
        </h2>
        <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>First Name:</strong> {profile?.first_name || "Not provided"}
          </li>
          <li>
            <strong>Last Name:</strong> {profile?.last_name || "Not provided"}
          </li>
          <li>
            <strong>Email:</strong> {profile?.email || "Not provided"}
          </li>
        </ul>
      </div>
    );
  }