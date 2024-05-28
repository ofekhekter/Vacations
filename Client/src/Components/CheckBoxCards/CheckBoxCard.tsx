import { Box, CardHeader, CardMedia, Typography } from '@mui/material';
import { VacationType } from '../../Models/VacationModel';
import { useState } from 'react';
import { changeStringFormat } from '../../utils/changeFormat';


interface CheckBoxCardProps {
    vacation: VacationType;
}

export const CheckBoxCard = ({ vacation }: CheckBoxCardProps) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return <Box className='card'
        sx={{
            marginBottom: "10px",
            textAlign: "center",
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