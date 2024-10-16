import { Router } from "express";
import {
  getComics,
  saveComic,
  getComicsByUserId,
  deleteComic,
} from "../controllers/comic.controller.js";
const route = Router();

route.get("/get-comics/:page", getComics);
route.get("/get-comics-wishes", getComicsByUserId);
route.post("/save-comic", saveComic);
route.delete("/delete-comic/:id", deleteComic);

export default route;
