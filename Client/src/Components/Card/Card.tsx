import * as React from 'react';
import { Button, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { VacationType } from '../../Models/VacationModel';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentVacation } from '../../features/vacationSlice';
import { deleteVacation } from '../../services/vacationsServices';
import { deleteImage } from '../../services/imagesServices';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { useSpring, animated } from '@react-spring/web';
import { addFollow } from '../../services/followingsServices';
import './card.css';

interface FadeProps {
  children?: React.ReactElement;
  in?: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

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
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAdmin = useSelector((state: any) => state.userRole.isAdmin);
  const userEmail = useSelector((state: any) => state.emailAddress.text);
  const dispatch = useDispatch();

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'spring-popper' : undefined;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleEdit = () => {
    dispatch(currentVacation(vacation.vacationId));
    navigate('/editvacation');
  };

  const removeCard = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      deleteVacation(vacation.vacationId.toString(), token);
      deleteImage(vacation.imageName);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleFavorites = () => {
    favorites ? setFavorites(false) : setFavorites(true);
    if (!favorites) {
      console.log(userEmail);
    //   useEffect(() => {
    //     const setFollowToDB = async () => {
    //         const allVacations = await addFollow(, vacation.vacationId);
    //     };
    //     setFollowToDB();
    // }, [favorites]);
    }
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
          <Button aria-describedby={id} onClick={handleDelete} sx={{ color: "#B0EBB4", backgroundColor: "#A91D3A", height: "25px", width: "60px" }} size="small">Delete</Button>
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Box sx={{ border: 1, p: 2, bgcolor: 'background.paper' }}>
                  <Typography>Are you sure you want to delete the vacation?</Typography>
                  <Button size='small' onClick={() => removeCard()} variant="contained" color="success">
                    Yes
                  </Button>
                  <Button size='small' onClick={() => setOpen(false)} variant="contained" color="error">
                    No
                  </Button>
                </Box>
              </Fade>
            )}
          </Popper>
        </Box>
      ) : (
        favorites ? (<IconButton onClick={handleFavorites} style={{ color: "red" }} className='favorites' aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>) : (<IconButton onClick={handleFavorites} style={{ color: "white" }} className='favorites' aria-label="add to favorites">
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