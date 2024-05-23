import { Box, Button, CardHeader, Divider, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';
import { VacationType } from '../../Models/VacationModel';
import { addVacation, getAllImageNames, getOneVacation, updateVacation } from "../../services/vacationsServices";
import { useEffect, useState } from "react";
import { addOneImage, getImageFile } from "../../services/imagesServices";
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './vacationCard.css';

dayjs.extend(utc);
dayjs.extend(timezone);

interface VacationCardProps {
    isEditMode: boolean;
}

export const VacationCard = ({ isEditMode }: VacationCardProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm<VacationType>();
    const [imageSrc, setImageSrc] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [selectImage, setSelectImage] = useState<string>("Select Image");
    const [border, setBorder] = useState<string>('1px solid black');
    const [oneVacation, setOneVacation] = useState<VacationType>();
    const vacationId = useSelector((state: any) => state.currentVacation.vacationId);
    const today: Dayjs = dayjs().tz("Asia/Jerusalem");
    const minEndDate = dayjs().tz("Asia/Jerusalem").add(1, 'day');


    useEffect(() => {
        const fetchAllVacations = async () => {
            const vacation = await getOneVacation(vacationId);
            setOneVacation({
                ...vacation,
                startDate: dayjs(vacation.startDate).tz("Asia/Jerusalem").format(),
                endDate: dayjs(vacation.endDate).tz("Asia/Jerusalem").format(),
            });
            if (isEditMode) setImageSrc(`http://localhost:3001/static/images/${vacation.imageName}.jpg`);
        };
        fetchAllVacations();
    }, [vacationId, isEditMode]);

    const submit = async (registerForm: VacationType) => {
        try {
            if (!imageSrc) {
                setSelectImage("no image selected");
            } else {
                const vacation = {
                    "destination": registerForm.destination,
                    "description": registerForm.description,
                    "startDate": registerForm.startDate,
                    "endDate": registerForm.endDate,
                    "price": registerForm.price,
                    "imageName": registerForm.destination
                } as VacationType;
                if (isEditMode) {
                    // const imagesNames = await getAllImageNames();
                    // console.log(imagesNames);
                    const response = await updateVacation(vacation, vacationId);
                    if (response.status === 200) {
                        const imageFile = await getImageFile(imageSrc);
                        await addOneImage(registerForm.destination, imageFile);
                        navigate('/userpage');
                    } else {
                        setResponseMessage(response);
                    }
                } else {
                    const response = await addVacation(vacation);
                    if (response.status === 201) {
                        const imageFile = await getImageFile(imageSrc);
                        await addOneImage(registerForm.destination, imageFile);
                        navigate('/userpage');
                    } else {
                        setResponseMessage(response);
                    }
                }
            }
        } catch {
            console.log("error");
        }
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        setBorder('none');
    };

    const returnToUserScreen = () => {
        navigate('/userpage');
    };


    return <section className="vacationContainer">
        <form onSubmit={handleSubmit(submit)} noValidate>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    width: "400px",
                    boxShadow: '3px 3px 13px 5px #153448',
                }}>
                <CardHeader sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: "#153448",
                }}
                    title={isEditMode ? 'Edit Vacation' : 'Add Vacation'}
                />
                <Divider variant="middle" />
                {isEditMode ? (<TextField
                    id="outlined-full-width"
                    label="destination"
                    multiline
                    rows={1}
                    required
                    InputLabelProps={{ shrink: true }}
                    defaultValue={oneVacation?.destination}
                    variant="outlined"
                    style={{ margin: 16 }}
                    {...register('destination', { required: false })}
                />) : (<TextField
                    id="outlined-full-width"
                    label="destination"
                    required
                    variant="outlined"
                    style={{ margin: 16 }}
                    {...register('destination', { required: true })}
                />)}
                {isEditMode ? (<TextField
                    id="outlined-multiline-static"
                    label="description"
                    required
                    InputLabelProps={{ shrink: true }}
                    defaultValue={oneVacation?.description}
                    // value={oneVacation?.description}
                    multiline
                    rows={3}
                    variant="outlined"
                    style={{ margin: 16 }}
                    {...register('description', { required: false })}
                />) : (<TextField
                    id="outlined-multiline-static"
                    label="description"
                    required
                    multiline
                    rows={3}
                    variant="outlined"
                    style={{ margin: 16 }}
                    {...register('description', { required: true })}
                />)}
                <Typography style={{
                    marginLeft: 16,
                    marginBottom: -10,
                    color: "#63625B",
                }}>
                    start on
                </Typography>
                {isEditMode ? (<LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        timezone="Asia/Jerusalem"
                        defaultValue={oneVacation?.startDate ? dayjs(oneVacation.startDate) : null}
                        value={oneVacation?.startDate ? dayjs(oneVacation.startDate) : null}
                        minDate={today}
                        onChange={(date) => setValue('startDate', date ? date.toISOString() : '', { shouldValidate: true })}
                        sx={{ m: 2, width: '28ch' }}
                    />
                </LocalizationProvider>) : (<LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        timezone="Asia/Jerusalem"
                        minDate={today}
                        onChange={(date) => setValue('startDate', date ? date.toISOString() : '', { shouldValidate: true })}
                        sx={{ m: 2, width: '28ch' }}
                    />
                </LocalizationProvider>)}
                <Typography style={{
                    marginLeft: 16,
                    marginBottom: -10,
                    color: "#63625B",
                }}>
                    end on
                </Typography>
                {isEditMode ? (<LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        timezone="Asia/Jerusalem"
                        value={oneVacation?.endDate ? dayjs(oneVacation.endDate) : null}
                        minDate={minEndDate}
                        onChange={(date) => setValue('endDate', date ? date.toISOString() : '', { shouldValidate: true })}
                        sx={{ m: 2, width: '28ch' }}
                    />
                </LocalizationProvider>) : (<LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        timezone="Asia/Jerusalem"
                        minDate={minEndDate}
                        onChange={(date) => setValue('endDate', date ? date.toISOString() : '', { shouldValidate: true })}
                        sx={{ m: 2, width: '28ch' }}
                    />
                </LocalizationProvider>)}
                <FormControl style={{ margin: 16 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">price</InputLabel>
                    {isEditMode ? (<OutlinedInput
                        type="number"
                        id="outlined-adornment-amount"
                        multiline
                        defaultValue={oneVacation?.price}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="price"
                        required
                        {...register('price', { required: false })}
                    />) : (<OutlinedInput
                        type="number"
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="price"
                        required
                        {...register('price', { required: true })}
                    />)}
                </FormControl>
                <Typography style={{
                    marginLeft: 16,
                    marginBottom: 10,
                    fontSize: 16,
                    color: "red",
                }}>
                    {responseMessage}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <div className="selectImage" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '200px',
                        height: '100px',
                        border: `${border}`,
                        backgroundImage: imageSrc ? `url(${imageSrc})` : 'url(http://localhost:3001/static/images/No-Image.png)',
                        backgroundSize: '200px 100px',
                        backgroundRepeat: 'no-repeat',
                    }}>
                        <label htmlFor="file-input">
                            {imageSrc ? <span className="changeImage">Change Image</span> : <span className="selectImage">{selectImage}</span>}
                            <input
                                id="file-input"
                                type="file"
                                className="filetype"
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                            />
                        </label>
                    </div>
                    {isEditMode ? <Button variant="contained" type="submit" sx={{ width: "250px" }}>Update</Button> :
                        <Button variant="contained" type="submit" sx={{ width: "250px" }}>Add Vacation</Button>}
                    <Button onClick={returnToUserScreen} variant="outlined" sx={{
                        width: "250px",
                        marginBottom: "10px",
                    }}>Cancel</Button>
                </Box>
            </Box>
        </form>
    </section>
}