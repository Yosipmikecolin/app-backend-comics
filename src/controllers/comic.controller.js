import { getAllComics } from "../axios/request.js";

export const getComics = async (req, res) => {
  try {
    const { page } = req.params;
    const response = await getAllComics(page);
    res.json(response.results);
  } catch (error) {
    console.log("error", error);
  }
};
