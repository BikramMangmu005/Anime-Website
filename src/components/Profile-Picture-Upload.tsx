import { useState } from "react";
import { uploadProfilePicture } from "../api/Profile-Api";
import { useAuth } from "../context/Auth-Context";
import { getImageUrl } from "../utils/Image-URL";

export default function ProfilePictureUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { token, user, updateProfilePicture } = useAuth();
  console.log("UPLOAD COMPONENT - user:", user);
  console.log("UPLOAD COMPONENT - token exists:", !!token);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    if (!token) {
      alert("Please log in first");
      return;
    }

    try {
      setLoading(true);

      const result = await uploadProfilePicture(file, token);

      console.log("Upload result:", result);
      console.log("New picture path:", result.profilePicture);

      updateProfilePicture(result.profilePicture);

      // Show the newly uploaded image immediately
      setPreview(`${getImageUrl(result.profilePicture)}?t=${Date.now()}`);

      setFile(null);
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload profile picture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-white">
      <div className="flex items-center gap-4">
        <img
          src={
            preview ??
            (user?.profilePicture
              ? getImageUrl(user.profilePicture)
              : undefined)
          }
          alt="Profile"
          className="h-20 w-20 rounded-full border border-white/20 object-cover"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] ?? null;
            setFile(selectedFile);

            if (preview) {
              URL.revokeObjectURL(preview);
            }

            setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
          }}
        />
      </div>

      <button
        type="button"
        onClick={handleUpload}
        disabled={loading || !file}
        className="rounded-lg bg-purple-600 px-5 py-2 hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Change Profile Picture"}
      </button>
    </div>
  );
}
