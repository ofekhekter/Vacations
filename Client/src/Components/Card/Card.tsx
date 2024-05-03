import { CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
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
    return <Card sx={{ maxWidth: 345 }}>
        <CardHeader
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={location}
        subheader="September 14, 2016"
      />
        <CardMedia
        component="img"
        height="194"
        image={imageName}
      />
      <Typography variant="body2" color="text.secondary">
      {description}
        </Typography>
        <p>{startDate}</p>
        <p>{endDate}</p>
        <p>{price}$</p>
        </Card>
}