import { useState, useEffect } from 'react'
import { Typography, List } from "@mui/material"
import { API_KEY } from '../../helpers/helpers';
import axios from 'axios';
import Article from '../Article/Article';
import { ArticleObj } from '../../helpers/interfaces';

const HomePage = () => {
  // todaysArticles
  const [todaysArticles, setTodaysArticles] = useState([]);

  // tu sciagane sa dane z API

  useEffect(() => {
    const today = new Date();
    console.log(today);
    const day = today.getDate(); //getDay => dzien tygodnia(sobota), getDate => dzien miesiaca
    const month = today.getMonth(); //getMonth =>zwraca numer miesiaca(miesace sa indeksowane od 0 , styczen => 0, luty => 1...)
    const year = today.getFullYear(); //getFullYear => rok (2022)
    const dateToday = `${year}-${month<9 ? `0${month + 1}` : month+1}-${day - 1}`;


    axios.get(`https://newsapi.org/v2/everything?q=world&from=${dateToday}&language=en&sortBy=popularity&apiKey=${API_KEY}`).then((response) => {
      // console.log(response.data.articles);
      setTodaysArticles(response.data.articles);
    }).catch((err) => {
      console.error(err.message);
    });


    return () => {}
  }, []);

  return (
    <>
      <Typography
        variant="h2"
        align='center'
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 500,
          letterSpacing: '.3rem',
          fontSize: '2rem',
          my: '0.8rem',
        }}
      >
        Today's hottest news
      </Typography>
      <List
      sx={{
        width: "100%",
        alignContent: "center"
      }}
      >
         {todaysArticles.length !== 0 && todaysArticles.map((art: ArticleObj) => {
            return <Article art={art} key={art.title}/>
         })}
      </List>
    </>
  )
}

export default HomePage