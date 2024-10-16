import { Router } from "express";
import { getComics } from "../controllers/comic.controller.js";
const route = Router();

route.get("/get-comics/:page", getComics);

export default route;
