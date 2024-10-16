import { axiosConfig } from "./config.js";

export const getAllComics = async () => {
  try {
    const response = await axiosConfig.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error;
  }}