"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

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
            toast.error("Failed to delete old profile picture.");
            return;
          }
        }
      }

      // Upload the new profile picture
      const fileName = `${userId}-${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profilepics")
        .upload(fileName, file);

      if (uploadError) {
        toast.error("Failed to upload new profile picture.");
        return;
      }

      // Get the public URL of the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from("profilepics")
        .getPublicUrl(fileName);

      if (!publicUrlData?.publicUrl) {
        toast.error("Failed to retrieve public URL for the uploaded file.");
        return;
      }

      const newLogoUrl = publicUrlData.publicUrl;

      // Update the user's logo_url in the database
      const { error: updateError } = await supabase
        .from("users")
        .update({ logo_url: newLogoUrl })
        .eq("id", userId);

      if (updateError) {
        toast.error("Failed to update profile picture URL in the database.");
        return;
      }

      // Update the state with the new logo URL
      setNewLogoUrl(newLogoUrl);
      toast.success("Profile picture updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="mt-4">
        {newLogoUrl ? (
          <img
            src={newLogoUrl}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300 my-4">No profile picture uploaded.</p>
        )}
        <input
        id="profilepictureuploader"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="mt-2 hidden"
        />
        <label htmlFor="profilepictureuploader" className="text-green-800 dark:text-green-100 cursor-pointer px-2 py-2 bg-lightmode-bg-color dark:bg-darkmode-bg-color rounded-md shadow-md hover:bg-lightmode-btn-bg-hover-color dark:hover:bg-darkmode-btn-bg-hover-color transition duration-200 ease-in-out">
          {newLogoUrl ? "Change profile picture" : "Upload profile picture"}
        </label>
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </>
  );
}