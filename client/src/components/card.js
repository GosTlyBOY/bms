import React, { useState } from 'react';
import '../css/Card.css';
import {Buffer} from 'buffer';
import axios from "axios";
import { Chip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const Card = ({ photo, title, genres, author, id, deleteBookFromState, setSnackBarShow, setSnackBarMsg }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(prevIsHovered => !prevIsHovered);
  };

  const deleteBook = async ()=>{
    setSnackBarMsg("Deleting book...")
    setSnackBarShow(true)
    const response = await axios.delete(`http://localhost:4000/booksmgmt/removebook/${id}`, {withCredentials: true});
    setSnackBarShow(false)
    if(response.status===200){
      deleteBookFromState(id)
    }
    else{
      console.log('error')
    }

  }


  return (
    <div
      className={`card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
    <img className="photo" src={photo ? (`data:image/${photo.imgExt};base64,${Buffer.from(photo.imgBuffer.data).toString('base64')}`) : ('/placeholderCover.jpg')} color="error" />

      <div className="text-container">
        <div className="top-left">
          <p className="name">{title}</p>
          <p className="text">{author}</p>
        </div>
        <div className="top-right"></div>

        <div className="department">{genres.map((genre, index) => (
          <Chip className="chip" key={index} size='small' label={genre} />
          ))}
        </div>

      </div>
      <div className="btn" onClick={deleteBook}><IconButton aria-label="delete" color='error' size='large'><DeleteOutlineIcon  fontSize='inherit'/></IconButton></div>
    </div>
  );
};

export default Card;


