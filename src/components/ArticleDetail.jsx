import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../api";
import "ldrs/leapfrog";

export default function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //console.log(article_id, "<<<<<<<<< article_id");
  useEffect(() => {
    setIsLoading(true);
    fetchArticles(article_id).then((data) => {
      //console.log(data);
      setArticle(data);
      setIsLoading(false);
    });
  }, [article_id]);

  return isLoading ? (
    <div className="loader">
      <l-leapfrog size="100" speed="2.5" color="black"></l-leapfrog>
    </div>
  ) : (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <img src={article.article_img_url} alt={article.title} />
      <p>Total Votes: {article.votes}</p>
      <p>Created on {new Date(article.created_at).toLocaleDateString()}</p>
    </div>
  );
}
