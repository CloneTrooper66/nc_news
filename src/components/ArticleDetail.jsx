import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../api";

export default function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticles(article_id).then((data) => {
      const filterById = data.filter(
        //   console.log(article_id);
        (element) => element.article_id === +article_id
      );
      setArticle(filterById);
    });
  }, [article_id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-detail">
      <h1>{article[0].title}</h1>
      <div className="image-container">
        <img src={article[0].article_img_url} alt={article[0].title} />
      </div>
      <div className="details">
        <p>Total Votes: {article[0].votes}</p>
        <p>Created on {new Date(article[0].created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
