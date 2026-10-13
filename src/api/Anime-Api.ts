export interface Anime {
    id: number;
    title: string;
    image: string | null;
    background: string | null;
    description: string | null;
}

const API_URL = import.meta.env.VITE_API_URL;

export const getAllAnime = async (): Promise<Anime[]> => {
    const response = await fetch(`${API_URL}/animes`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch anime");
    }

    return data.data;
};

export const getAnimeById = async (id: number): Promise<Anime> => {
    const response = await fetch(`${API_URL}/animes/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch anime");
    }

    return data.data;
};