import axios from "axios";
const api = axios.create({
  baseURL: "https://project-i8u3.onrender.com/api",
});

export const fetchArticles = (article_id) => {
  if (article_id) {
    return api.get(`/articles/${article_id}`).then((response) => {
      return response.data;
    });
  } else {
    return api.get("/articles").then((response) => {
      return response.data;
    });
  }
};

export const fetchComments = (article_id) => {
  return api.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data;
  });
};

export const getUser = () => {
  return api.get("/users").then((response) => {
    return response.data;
  });
};
