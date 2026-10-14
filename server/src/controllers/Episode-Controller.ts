import type { Request, Response } from "express";

type Episode = {
    number: number;
    title: string;
    videoUrl: string | null;
};

const episodesByAnime: Record<number, Episode[]> = {
    1: [
        {
            number: 1,
            title: "Episode 1",
            videoUrl: null,
        },
        {
            number: 2,
            title: "Episode 2",
            videoUrl: null,
        },
        {
            number: 3,
            title: "Episode 3",
            videoUrl: null,
        },
    ],
};

export const getEpisodesForAnime = (
    req: Request,
    res: Response
) => {
    const animeId = Number(req.params.id);

    if (!Number.isInteger(animeId) || animeId < 1) {
        return res.status(400).json({
            message: "Invalid anime ID",
        });
    }

    const episodes = episodesByAnime[animeId] ?? [];

    return res.status(200).json({
        data: episodes,
    });
};

    