import { List } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../helpers/helpers";
import { ArticleSearchObj } from "../../helpers/interfaces";
import Article from "../Article/Article";
import SearchForm from "../SearchForm/SearchForm";

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if(keyword){
      axios.get(`https://newsapi.org/v2/everything?q=${keyword}&from="2022-10-01"&language=en&sortBy=popularity&apiKey=${API_KEY}`).then((response) => {
        setArticles(response.data.articles);
      }).catch((err) => {
        console.error(err.message);
      });
    }

    articles.map(el => {
      console.log(Article(el));
    });

    return () => {}
  }, [keyword]);

  return (
    <>
      <SearchForm setKeyword={setKeyword}/>
      <List>
        {articles.length !== 0 && articles.map((art: ArticleSearchObj) => {
          return <Article art={art} key={art.title} />
        })}
      </List>
    </>
  );
}


export default SearchPage;