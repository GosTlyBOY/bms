
import React, { useState } from 'react';
import './Card.css';


import { Chip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Card = ({ photo, title, genres, author }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(prevIsHovered => !prevIsHovered);
  };

  return (
    <div
      className={`card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <img src={photo}  className="photo" color="error"/>
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
      <div className="btn" ><IconButton aria-label="delete" color='error' size='large'><DeleteOutlineIcon  fontSize='inherit'/></IconButton></div>
    </div>
  );
};

export default Card;


