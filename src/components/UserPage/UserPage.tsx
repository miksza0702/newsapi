import { Typography } from "@mui/material";
import React from "react";
import { auth } from "../../helpers/firebaseConfig";
import Button from '@mui/material/Button';
import { UserProps } from "../../helpers/interfaces";
import { signOut } from "firebase/auth";
import ProfilePhotoForm from "../ProfilePhotoForm/ProfilePhotoForm";
import { useContext } from "react";
import { authContext } from "../../helpers/authContext";

const UserPage = () => {

  const loggedIn = useContext(authContext);

  return (
    <>
      {loggedIn && auth.currentUser && <>
        <Typography
          variant="h2"
          align="center"
          sx={{
              my: '1rem',
              borderBottom: '1px solid #1976d2',
              pb: '.5rem',
              fontSize: '2rem',
            }}
        >
          Your Profile
        </Typography>

        <Typography
          variant="h5"
          align="center"
          sx={{
              fontSize: '1rem',
              my: '1rem',
              mx: 'auto',
          }}
        >
          Your email: { auth.currentUser.email }

        </Typography>
        <ProfilePhotoForm />
        <Button
          variant="outlined"
          onClick={() => signOut(auth)}
          sx={{
            display: 'block',
            mx: 'auto',
            my: '1rem',
          }}
          >
            Log out
        </Button>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontSize: '1.7rem',
            fontWeight: '100',
            borderTop: '1px solid #1976d2',
            pt: '.3rem',
          }}
        >
          Liked posts
        </Typography>
      </>}
    </>
    


  );
}

export default UserPage;