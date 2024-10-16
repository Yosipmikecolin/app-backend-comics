import { Router } from "express";
import { getComics, saveComic } from "../controllers/comic.controller.js";
const route = Router();

route.get("/get-comics/:page", getComics);
route.post("/save-comic", saveComic);
route.delete("/delete-comic/:id", getComics);

export default route;
