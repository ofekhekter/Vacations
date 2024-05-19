import { Box, Button, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { VacationType } from '../../Models/VacationModel';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentVacation } from '../../features/vacationSlice';
import './card.css';
import { deleteVacation } from '../../services/vacationsServices';

interface CardProps {
  vacation: VacationType;
}

export const changeStringFormat = (value: string) => {
  const [year, month, day] = value.split('').map(word => word === '-' ? '.' : word).join('').split('.');
  return `${day}.${month}.${year}`;
}

export const Card = ({ vacation }: CardProps) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<boolean>(false);
  const [imageError, setImageError] = useState(false);
  const isAdmin = useSelector((state: any) => state.userRole.isAdmin);
  const dispatch = useDispatch();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleEdit = () => {
    dispatch(currentVacation(vacation.vacationId));
    navigate('/editvacation');
  };

  const handleDelete = () => {
    deleteVacation(vacation.vacationId.toString())
    navigate('/userpage');
  };

  const handleFavorites = () => {
    favorites ? setFavorites(false) : setFavorites(true);
  };


  return <Box className='card'
    sx={{
      width: 345,
      backgroundColor: "#153448"
    }}>
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <CardHeader
        sx={{ color: "white" }}
        title={vacation.destination}
      />
      {isAdmin ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button onClick={handleEdit} sx={{ color: "#B0EBB4", backgroundColor: "#006769", height: "25px", width: "60px" }} size="small">Edit</Button>
          <Button onClick={handleDelete} sx={{ color: "#B0EBB4", backgroundColor: "#A91D3A", height: "25px", width: "60px" }} size="small">Delete</Button>
        </Box>
      ) : (
        favorites ? (<IconButton onClick={() => handleFavorites()} style={{ color: "red" }} className='favorites' aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>) : (<IconButton onClick={() => handleFavorites()} style={{ color: "white" }} className='favorites' aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        )
      )}
    </Box>
    <Typography variant="body2" color="white">
      {changeStringFormat(vacation.startDate.substring(2, 10)) + ' - ' + changeStringFormat(vacation.endDate.substring(2, 10))}
    </Typography>
    <CardMedia
      component="img"
      height="194"
      image={imageError ? 'http://localhost:3001/static/images/No-Image.png' : `http://localhost:3001/static/images/${vacation.imageName}.jpg`}
      onError={handleImageError}
      alt="Image"
    />
    <Typography sx={{
      margin: '5px 5px 5px 5px',
      fontSize: 'small',
    }} variant="body2" color="#EADBC8">
      {vacation.description}
    </Typography>
    <Typography variant="body1" color="#8DECB4">
      {vacation.price}$
    </Typography>
  </Box>
}