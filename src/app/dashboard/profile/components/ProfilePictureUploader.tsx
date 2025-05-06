"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface ProfilePictureUploaderProps {
  userId: string;
  currentLogoUrl: string | null;
}

export default function ProfilePictureUploader({
  userId,
  currentLogoUrl,
}: ProfilePictureUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newLogoUrl, setNewLogoUrl] = useState<string | null>(currentLogoUrl);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const supabase = createClient();

    try {
      // Delete the old profile picture if it exists
      if (currentLogoUrl) {
        const oldFileName = currentLogoUrl.split("/").pop();
        if (oldFileName) {
          const { error: deleteError } = await supabase.storage
            .from("profilepics")
            .remove([oldFileName]);
          if (deleteError) {
            throw new Error("Failed to delete old profile picture.");
          }
        }
      }

      // Upload the new profile picture
      const fileName = `${userId}-${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profilepics")
        .upload(fileName, file);

      if (uploadError) {
        throw new Error("Failed to upload new profile picture.");
      }

      // Get the public URL of the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from("profilepics")
        .getPublicUrl(fileName);

      if (!publicUrlData?.publicUrl) {
        throw new Error("Failed to retrieve public URL for the uploaded file.");
      }

      const newLogoUrl = publicUrlData.publicUrl;

      // Update the user's logo_url in the database
      const { error: updateError } = await supabase
        .from("users")
        .update({ logo_url: newLogoUrl })
        .eq("id", userId);

      if (updateError) {
        throw new Error("Failed to update profile picture URL in the database.");
      }

      // Update the state with the new logo URL
      setNewLogoUrl(newLogoUrl);
      alert("Profile picture updated successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/30 dark:bg-green-900/30 backdrop-blur-md p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-green-800 dark:text-green-100">
        Profile Picture
      </h2>
      <div className="mt-4">
        {newLogoUrl ? (
          <img
            src={newLogoUrl}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No profile picture uploaded.</p>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="mt-2"
        />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}