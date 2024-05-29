import * as React from 'react';
import { CardHeader, CardMedia, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { VacationType } from '../../Models/VacationModel';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentVacation } from '../../features/vacationSlice';
import { isDeleted } from '../../features/deletedCardSlice';
import { deleteVacation } from '../../services/vacationsServices';
import { deleteImage } from '../../services/imagesServices';
import { getUserId } from '../../services/usersServices';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { useSpring, animated } from '@react-spring/web';
import { addFollow, deleteFollow, getAllFollowings } from '../../services/followingsServices';
import { changeStringFormat } from '../../utils/changeFormat';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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
  vacationIdsOfUser: number[];
}

export const Card = ({ vacation, vacationIdsOfUser }: CardProps) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<boolean>(false);
  const [imageError, setImageError] = useState(false);
  const [open, setOpen] = useState(false);
  const [totalFavorites, setTotalFavorites] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAdmin = useSelector((state: any) => state.userRole.isAdmin);
  const userEmail = useSelector((state: any) => state.emailAddress.text);
  const dispatch = useDispatch();

  const fetchAllFollowings = async () => {
    const allFollowings = await getAllFollowings();
    for (const follow of allFollowings) {
      if (follow.vacationId === vacation.vacationId) {
        setTotalFavorites(follow.followers);
      }
    }
  };

  fetchAllFollowings();

  useEffect(() => {
    setFavorites(false);
    if (vacationIdsOfUser.length > 0) {
      for (const vacationId of vacationIdsOfUser) {
        if (vacationId === vacation.vacationId) {
          setFavorites(true);
        }
      }
    } else setFavorites(false);
  }, [vacationIdsOfUser, vacation.vacationId]);

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'spring-popper' : undefined;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleEdit = () => {
    dispatch(currentVacation(vacation.vacationId));
    navigate('/editvacation');
  };

  const removeCard = async () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      dispatch(isDeleted(true));
      setOpen(false);
      await deleteVacation(vacation.vacationId.toString(), token);
      await deleteImage(vacation.imageName);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleFavorites = async () => {
    const userId = await getUserId(userEmail);
    if (favorites) {
      setFavorites(false);
      await deleteFollow(userId, vacation.vacationId);
      await fetchAllFollowings();
    } else {
      setFavorites(true);
      await addFollow(userId, vacation.vacationId);
      await fetchAllFollowings();
    }
  };

  return <Box className='card'
    sx={{
      width: 345,
      height: 420,
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
          <Stack direction="column" spacing={1} sx={{margin: "3px"}}>
            <Button onClick={handleEdit} size='small' variant="contained">
              edit
            </Button>
            <Button onClick={handleDelete} size='small' color='error' variant="contained" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Stack>
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Box sx={{ border: 1, p: 2, bgcolor: 'background.paper' }}>
                  <Typography>Are you sure you want to delete the vacation?</Typography>
                  <Button size='small' onClick={removeCard} variant="contained" color="success">
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
          <Typography variant="body2" color="white">{totalFavorites}</Typography>
        </IconButton>) : (<IconButton onClick={handleFavorites} style={{ color: "white" }} className='favorites' aria-label="add to favorites">
          <FavoriteIcon />
          <Typography variant="body2" color="white">{totalFavorites}</Typography>
        </IconButton>
        )
      )
      }
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
      overflowWrap: 'break-word',
    }} variant="body2" color="#EADBC8">
      {vacation.description}
    </Typography>
    <Typography variant="body1" color="#8DECB4">
      {vacation.price}$
    </Typography>
  </Box>
}