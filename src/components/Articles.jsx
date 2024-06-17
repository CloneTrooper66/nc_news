import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { fetchArticles } from "../api";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Articles() {
  const tempUrl = "https://project-i8u3.onrender.com/api/articles";
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((articles) => {
      //setArticles(articles);
    });
    fetch(tempUrl)
      .then((result) => {
        return result.json();
      })
      .then((articles) => {
        setArticles(articles);
      });
  }, [setArticles]);

  return (
    <div className="articles-wrapper">
      {articles.map((article) => (
        <React.Fragment key={article.article_id}>
          <article className="article-container">
            <h1 className="article-title">{article.title}</h1>
            <img
              src={article.article_img_url}
              alt={article.title}
              className="article-image"
            />
            <div className="article-details">
              <p className="article-votes">
                Total Votes: {article.votes}
                <button className="like-button">Like</button>
                <button className="dislike-button">Dislike</button>
              </p>
              <p className="article-created">
                Created on {article.created_at.substring(0, 10)}
              </p>
            </div>
          </article>
        </React.Fragment>
      ))}
    </div>
  );
}

//  <Box sx={{ flexGrow: 1 }}>
//    <Grid container spacing={2}>
//      <Grid xs={12}>
//        <Item>Title</Item>
//      </Grid>
//      <Grid xs={9}>
//        <Item>Image</Item>
//      </Grid>
//      <Grid xs={3}>
//        <Item>Votes</Item>
//      </Grid>
//    </Grid>
//  </Box>;
