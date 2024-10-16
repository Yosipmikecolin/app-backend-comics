import { axiosConfig } from "./config.js";

export const getAllComics = async (pageNumber = 1) => {
  const limit = 10;
  const offset = (pageNumber - 1) * limit;
  try {
    const response = await axiosConfig.get("/", { params: { limit, offset } });
    return response.data;
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error;
  }
};
