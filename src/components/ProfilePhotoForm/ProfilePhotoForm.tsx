import { Button, Card, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { storage, auth } from "../../helpers/firebaseConfig";
import { ProfilePhotoFormData } from "../../helpers/interfaces";
import { ref, uploadBytes } from "firebase/storage"; 

const ProfilePhotoForm = () => {
  const { register, handleSubmit } = useForm<ProfilePhotoFormData>();

  const submitHandler = (data: ProfilePhotoFormData) => {
    const photo = data.profilePhoto[0];
    if (auth.currentUser) {
      const storageRef = ref(storage, `/users/${auth.currentUser.uid}/avatar`);
      uploadBytes(storageRef, photo).then(()=> console.log("success add photo")).catch((err) => console.error(err.message));
    }    
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card sx={{ p: "1rem" }}>
        <Typography variant="h6" sx={{ fontSize: "1rem" }} align="center">
          Upload your profile picture
        </Typography>
        <Button
          variant="contained"
          component="label"
          sx={{
            display: "block",
            mx: "auto",
            my: "1rem",
            alignContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "1rem" }} align="center">
            Select a file
          </Typography>
          <input
            type="file"
            hidden
            {...register("profilePhoto", { required: true })}
          />
        </Button>
        <Button
          variant="contained"
          sx={{ display: "block", mx: "auto" }}
          type="submit"
        >
          Upload
        </Button>
      </Card>
    </form>
  );
};

export default ProfilePhotoForm;
