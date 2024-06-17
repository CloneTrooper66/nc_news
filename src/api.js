import axios from "axios";
const api = axios.create({
  baseURL: "https://project-i8u3.onrender.com/api",
});

export const fetchArticles = () => {
  return api.get("/articles").then((response) => {
    return response.data.articles;
  });
};
