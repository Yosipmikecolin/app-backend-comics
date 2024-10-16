import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "https://comicvine.gamespot.com/api/episodes/",

  params: {
    api_key: "fd58f9b0f45b499e227ee19c25c6cc537ad8d66a",
    filter: "name:Batman",
    limit: 10,
    format: "json",
  },
});
