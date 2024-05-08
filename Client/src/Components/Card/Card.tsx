import Card from '@mui/material/Card';
import { CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import './card.css';

interface CardProps {
  id?: number;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  imageName: string;
}

export const Cardd = ({ location, description, startDate, endDate, price, imageName }: CardProps) => {
  const [favorites, setFavorites] = useState<boolean>(false);


  return <Card className='card' sx={{ maxWidth: 345 }}>
    <CardHeader
      action={
        <IconButton aria-label="settings">
        </IconButton>
      }
      title={location}
      subheader={startDate + ' - ' + endDate}
    />
    <CardMedia
      component="img"
      height="194"
      image={`http://localhost:3001/static/images/${imageName}.jpg`}
    />
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
    <p>{startDate}</p>
    <p>{endDate}</p>
    <p>{price}$</p>
    <IconButton style={favorites ? { color: "red" } : { color: "primary" }} onClick={() => setFavorites} className='favorites' aria-label="add to favorites">
      <FavoriteIcon />
    </IconButton>
  </Card>
}