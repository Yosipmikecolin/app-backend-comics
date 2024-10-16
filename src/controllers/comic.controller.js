import { getAllComics } from "../axios/request.js";

export const getComics = async (_req, res) => {
  try {
    const response = await getAllComics();
    res.json(response.results);
  } catch (error) {
    console.log("error", error);
  }
};
