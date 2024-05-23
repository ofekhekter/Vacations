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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './vacationCard.css';

interface VacationCardProps {
    isEditMode: boolean;
}

export const VacationCard = ({ isEditMode }: VacationCardProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm<VacationType>();
    const [imageSrc, setImageSrc] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [selectImage, setSelectImage] = useState<string>("Select Image");
    const [oneVacation, setOneVacation] = useState<VacationType>();
    const vacationId = useSelector((state: any) => state.currentVacation.vacationId);
    const today: Dayjs = dayjs();
    const minEndDate = dayjs().add(1, 'day');

    useEffect(() => {
        const fetchAllVacations = async () => {
            const vacation = await getOneVacation(vacationId);
            setOneVacation(vacation);
        };
        fetchAllVacations();
    }, [vacationId]);

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
                    const imagesNames = await getAllImageNames();
                    console.log(imagesNames);
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
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const returnToUserScreen = () => {
        navigate('/userpage');
    }


    return <section className="VacationContainer">
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
                    required
                    multiline
                    rows={1}
                    InputLabelProps={{ shrink: true }}
                    defaultValue={oneVacation?.destination}
                    variant="outlined"
                    style={{ margin: 16 }}
                    {...register('destination', { required: true })}
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
                    multiline
                    rows={4}
                    variant="outlined"
                    style={{ margin: 16 }}
                    {...register('description', {
                        required: true
                    })}
                />) : (<TextField
                    id="outlined-multiline-static"
                    label="description"
                    required
                    multiline
                    rows={4}
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
                        value={oneVacation?.startDate ? dayjs(oneVacation.startDate) : null}
                        minDate={today}
                        {...register('startDate', { required: true })}
                        onChange={(date) => setValue('startDate', date ? date.toISOString() : '', { shouldValidate: true })}
                        sx={{ m: 2, width: '28ch' }}
                    />
                </LocalizationProvider>) : (<LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        minDate={today}
                        {...register('startDate', { required: true })}
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
                        value={oneVacation?.endDate ? dayjs(oneVacation.endDate) : null}
                        minDate={minEndDate}
                        {...register('endDate', { required: true })}
                        onChange={(date) => setValue('endDate', date ? date.toISOString() : '', { shouldValidate: true })}
                        sx={{ m: 2, width: '28ch' }}
                    />
                </LocalizationProvider>) : (<LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        minDate={minEndDate}
                        {...register('endDate', { required: true })}
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
                        {...register('price', { required: true })}
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
                        width: '250px',
                        height: '80px',
                        border: '1px solid black',
                    }}>
                        {imageSrc && (
                            <img src={imageSrc} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        )}
                        <label htmlFor="file-input">
                            <span className="selectImage">{selectImage}</span>
                            {isEditMode ? (<input
                                id="file-input"
                                type="file"
                                className="filetype"
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                            />) : (<input
                                id="file-input"
                                type="file"
                                className="filetype"
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                            />)}
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