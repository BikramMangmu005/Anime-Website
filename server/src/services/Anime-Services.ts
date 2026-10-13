import Anime from "../models/Anime";
import type {
    CreateAnimeInput,
    UpdateAnimeInput,
} from "../types/Anime-Types";

export const createAnime = async (data: CreateAnimeInput) => {
    const anime = await Anime.create({
        title: data.title,
        image: data.image,
    });

    return anime;
};




export const getAllAnime = async () => {
    return await Anime.findAll({
        order: [["createdAt", "ASC"]],
    });
};




export const getAnimeById = async (id: number) => {
    return await Anime.findByPk(id);
};

export const updateAnime = async (
    id: number,
    data: UpdateAnimeInput
) => {
    const anime = await Anime.findByPk(id);

    if (!anime) {
        throw new Error("Anime not found");
    }

    await anime.update(data);

    return anime;
};



export const deleteAnime = async (id: number) => {
    const anime = await Anime.findByPk(id);

    if (!anime) {
        throw new Error("Anime not found");
    }

    await anime.destroy();
};
