import express from 'express';

import { getEpisodesForAnime } from '../controllers/Episode-Controller';


const router = express.Router();


router.get("/:id/episodes", getEpisodesForAnime);


export default router;
