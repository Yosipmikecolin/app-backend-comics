import axios from "axios";
import dotenv from "dotenv"
dotenv.config()

export const axiosConfig = axios.create({
  baseURL: "https://comicvine.gamespot.com/api/issues/",

  params: {
    api_key: process.env.API_KEY,
    filter: "name:Batman",
    format: "json",
  },
});
