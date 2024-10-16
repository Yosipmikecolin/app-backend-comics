import jwt from "jsonwebtoken";
import { getAllComics } from "../axios/request.js";
import comicModel from "../schemas/comic.model.js";

export const getComics = async (req, res) => {
  try {
    const { page } = req.params;
    const response = await getAllComics(page);
    res.json(response.results);
  } catch (error) {
    console.log("error", error);
  }
};

export const saveComic = async (req, res) => {
  try {
    const comic = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id; // Extraer el ID del usuario

      const newComic = await comicModel.create({
        ...comic,
        user: userId, // Enlaza el cómic con el ID del usuario
      });

      res.status(201).json({
        message: "Cómic creado exitosamente",
        comic: newComic,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};
