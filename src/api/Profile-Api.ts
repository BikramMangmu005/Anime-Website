const API_URL = import.meta.env.VITE_API_URL;

export const uploadProfilePicture = async (
  file: File,
  token: string
) => {
  const formData = new FormData();

  formData.append("profilePicture", file);

  const response = await fetch(`${API_URL}/profile-picture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Upload failed");
  }

  return data;
};


export const getCurrentUser = async (token: string) => {
  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data.user;
};
