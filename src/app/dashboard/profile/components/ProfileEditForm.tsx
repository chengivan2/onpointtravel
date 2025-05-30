"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ProfileEditForm({ profile }: { profile: any }) {
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    email: profile?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        toast.error("Failed to update profile. Please try again.");
        return;
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
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
          <label className="block text-sm font-medium text-lightmode-heading-color dark:text-darkmode-heading-color">
            First Name
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded bg-white/70 dark:bg-green-900/30 text-lightmode-text-color dark:text-darkmode-text-color"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-lightmode-heading-color dark:text-darkmode-heading-color">
            Last Name
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded bg-white/70 dark:bg-green-900/30 text-lightmode-text-color dark:text-darkmode-text-color"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-lightmode-heading-color dark:text-darkmode-heading-color">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded bg-white/70 dark:bg-green-900/30 text-lightmode-text-color dark:text-darkmode-text-color"
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="cursor-pointer mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
      >
        Save Changes
      </button>
    </form>
  );
}
