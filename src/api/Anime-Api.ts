import type { Anime, Episode } from "../types/Anime-Types";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllAnime = async (): Promise<Anime[]> => {
    const response = await fetch(`${API_URL}/animes`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch anime");
    }

    return data.data;
};

export const getAnimeById = async (
    id: number
): Promise<Anime> => {
    const response = await fetch(`${API_URL}/animes/${id}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch anime");
    }

    return data.data;
};

export const getEpisodesForAnime = async (
    animeId: number
): Promise<Episode[]> => {
    const response = await fetch(
        `${API_URL}/animes/${animeId}/episodes`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch episodes");
    }

    return data.data;
};

