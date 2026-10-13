const API_URL = import.meta.env.VITE_API_URL;

export function getImageUrl(path: string) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_URL.replace("/api", "")}${path}`;
}

