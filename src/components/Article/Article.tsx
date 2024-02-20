import React, { useContext, useState } from "react";
import { ArticleProps } from "../../helpers/interfaces";
import {Card, ListItem, ListItemText } from "@mui/material";
import { authContext } from "../../helpers/authContext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { async } from "@firebase/util";
import { auth, firestore } from "../../helpers/firebaseConfig";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

const Article : React.FC<ArticleProps> = ({ art }) => {
  const loggedIn = useContext(authContext);
  const [liked, setLiked] = useState<boolean>(false);
  const iconStyles = {
    float: 'right',
    mr: '3px',
    my: '3px',
    color: liked ? 'red' : 'black',
  }

  const likeTheArticle = async () => {
    if(loggedIn && auth.currentUser){
      await setDoc(doc(firestore, auth.currentUser.uid, art.title), art)
      setLiked(true);
    }
  }

  const unlikeTheArticle = async () => {
    if(loggedIn && auth.currentUser){
      await deleteDoc(doc(firestore, auth.currentUser.uid, art.title));
      setLiked(false);
    }
  }

  console.log(art);
  return (
    <ListItem>
      <Card variant="outlined" sx={{ mb: "10px" }}>
        <a href={art.url} target="__blank" style={{ textDecoration: "none" }}>
          <img src={art.urlToImage} alt={art.title} style={{width: "100%"}}/>
          <ListItemText sx={{color:"black"}}>{art.title}</ListItemText>
        </a>
        {
          loggedIn && <>
          {liked ? <FavoriteIcon sx={iconStyles} onClick={unlikeTheArticle}/> : <FavoriteBorderIcon sx={iconStyles}  onClick={likeTheArticle}/>}
          </>
        }

      </Card>
    </ListItem>
  );
};

export default Article;