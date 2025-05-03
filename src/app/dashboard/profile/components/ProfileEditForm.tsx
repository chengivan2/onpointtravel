"use client";

import { useState } from "react";

export default function ProfileEditForm({ profile }: { profile: any }) {
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone: profile?.phone || "",
    bio: profile?.bio || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/30 dark:bg-green-900/30 backdrop-blur-md p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-bold text-green-800 dark:text-green-100">
        Edit Profile
      </h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded bg-white/70 dark:bg-green-900/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded bg-white/70 dark:bg-green-900/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded bg-white/70 dark:bg-green-900/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded bg-white/70 dark:bg-green-900/30"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
      >
        Save Changes
      </button>
    </form>
  );
}