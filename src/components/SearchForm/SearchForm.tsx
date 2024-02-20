import { display } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from '@mui/material';
import { SearchFormData } from "../../helpers/interfaces";
import { SearchFormProps } from "../../helpers/interfaces";

const SearchForm: React.FC<SearchFormProps> = ({setKeyword}) => {
  const {register, handleSubmit} = useForm<SearchFormData>(); 

  const submitHandler = ({keyword}: SearchFormData) => {
    setKeyword(keyword);
  } 
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}
      style={{display: 'flex', flexDirection: 'column'} }
      >
        <TextField placeholder="Keyword" 
        {...register('keyword', {required: true})}
        sx={{
          my: '.5rem',
          display: 'block',
          mx: 'auto',
        }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            display: 'block',
            mx: 'auto'
          }}
        >
          Search
        </Button>
      </form>
    </>
  );
}

export default SearchForm