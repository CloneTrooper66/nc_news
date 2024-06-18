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

// export const fetchArticles = (article_id) => {
//   return api
//     .get("/articles", {
//       params: {
//         type: article_id,
//       },
//     })
//     .then((response) => {
//       // console.log(response);
//       return response.data;
//     });
// };
