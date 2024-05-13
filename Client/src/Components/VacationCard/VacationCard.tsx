import { Box, Button, CardHeader, Divider, FormControl, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';
import { VacationFormModel, VacationType } from '../../Models/VacationModel';
import { addVacation } from "../../services/vacationsServices";
import './vacationCard.css';

interface VacationCardProps {
    vacation?: VacationFormModel;
    isEditable: boolean;
}

export const VacationCard = ({ isEditable, vacation }: VacationCardProps) => {
    const { register, handleSubmit, setValue } = useForm<VacationFormModel>();

    const submit = async (registerForm: VacationFormModel) => {
        try {
            const vacation = {
                "destination": registerForm.description,
                "description": registerForm.description,
                "startDate": registerForm.startDate,
                "endDate": registerForm.endDate,
                "price": registerForm.price,
            } as unknown as VacationType;
            const response = await addVacation(vacation);
            console.log("response: ", response);
        } catch {
            console.log("error");
        }
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
                    title='Add Vacation'
                />
                <Divider variant="middle" />
                <TextField
                    id="outlined-full-width"
                    label="destination"
                    required
                    variant="outlined"
                    style={{ margin: 16 }}
                    {...register('destination', { required: true })}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="description"
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    style={{ margin: 16 }}
                    {...register('description', { required: true })}
                />
                <Typography style={{
                    marginLeft: 16,
                    marginBottom: -10,
                    color: "#63625B",
                }}>
                    start on
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        {...register('startDate', { required: true })}
                        onChange={(date) => setValue('startDate', date ? date.toISOString() : '', { shouldValidate: true })}
                        sx={{ m: 2, width: '28ch' }}
                    />
                </LocalizationProvider>
                <Typography style={{
                    marginLeft: 16,
                    marginBottom: -10,
                    color: "#63625B",
                }}>
                    end on
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        {...register('endDate', { required: true })}
                        onChange={(date) => setValue('endDate', date ? date.toISOString() : '', { shouldValidate: true })}
                        sx={{ m: 2, width: '28ch' }}
                    />
                </LocalizationProvider>
                <FormControl style={{ margin: 16 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">price</InputLabel>
                    <OutlinedInput
                        type="number"
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="price"
                        required
                        {...register('price', { required: true })}
                    />
                </FormControl>
                <Typography style={{
                    marginLeft: 16,
                    marginBottom: 10,
                    fontSize: 16,
                    color: "#63625B",
                }}>
                    cover image
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
                        width: '300px',
                        height: '120px',
                        border: '1px solid black',
                    }}>
                        <label htmlFor="file-input">
                            <span className="selectImage">Select Image</span>
                            <Input id="file-input" type="file" className="filetype" style={{ display: 'none' }} />
                        </label>
                    </div>
                    <Button variant="contained" type="submit" sx={{ width: "250px" }}>Add Vacation</Button>
                    <Button variant="outlined" sx={{
                        width: "250px",
                        marginBottom: "10px",
                    }}>Cancel</Button>
                </Box>
            </Box>
        </form>
    </section>
}