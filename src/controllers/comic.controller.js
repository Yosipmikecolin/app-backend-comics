import jwt from "jsonwebtoken";
import { getAllComics } from "../axios/request.js";
import comicModel from "../schemas/comic.model.js";

export const getComics = async (req, res) => {
  try {
    const { page } = req.params;
    const response = await getAllComics(page);
    res.status(200).json(response.results);
  } catch (error) {
    console.log("error", error);
    res.status(500).json([]);
  }
};

export const saveComic = async (req, res) => {
  try {
    const comic = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id; // Extraer el ID del usuario

      const newComic = await comicModel.create({
        ...comic,
        user: userId, // Enlaza el cómic con el ID del usuario
      });

      res.status(201).json({
        message: "Successfully created comic",
        comic: newComic,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

export const getComicsByUserId = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id; // Extraer el ID del usuario

      const comics = await comicModel.find({ user: userId });

      // Verificar si el usuario tiene cómics
      if (comics.length === 0) {
        return res
          .status(404)
          .json({ message: "No comics found for this user" });
      }

      res.status(200).json({
        message: "Successfully Obtained Comics",
        comics,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

export const deleteComic = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComic = await comicModel.findByIdAndDelete(id);

    // Verificar si se encontró el cómi
    if (!deletedComic) {
      return res.status(404).json({ message: "Comic not found" });
    } else {
      res.status(200).json({
        message: "Comic successfully removed",
        comic: deletedComic,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};
