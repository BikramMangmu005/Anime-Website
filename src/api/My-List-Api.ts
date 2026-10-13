import type {
    AddToListParams,
    MyListItem,
    MyListStatus,
} from "../types/My-list-Type";

const API_URL = import.meta.env.VITE_API_URL;


// ADD TO MY LIST
export const addToMyList = async ({
    animeId,
    status,
}: AddToListParams) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/my-list`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
                animeId,
                status,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to add anime to list"
        );
    }

    return data;
};


// GET MY LIST
export const getMyList = async (): Promise<MyListItem[]> => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/my-list`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to fetch My List"
        );
    }

    return data.data;
};


// UPDATE MY LIST
export const updateMyList = async (
    id: number,
    data: {
        status?: MyListStatus;
        episodesWatched?: number;
        rating?: number | null;
    }
) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/my-list/${id}`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to update My List"
        );
    }

    return result.data;
};


// DELETE FROM MY LIST
export const deleteMyList = async (
    id: number
) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/my-list/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to remove anime from My List"
        );
    }

    return data;
};