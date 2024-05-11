import Card from '@mui/material/Card';
import { Box, Button, CardHeader, Divider, FormControl, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';
import { VacationFormModel } from '../../Models/VacationModel';
import './vacationCard.css';
import { useState } from 'react';


interface VacationCardProps {
    vacation?: VacationFormModel;
    isEditable: boolean;
}

export const VacationCard = ({ isEditable }: VacationCardProps) => {
    const { register, handleSubmit } = useForm<VacationFormModel>();

    const submit = async (registerForm: VacationFormModel) => {
        try {
            console.log("register: ", registerForm);
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
                    start on:
                </Typography>
                <LocalizationProvider {...register('startDate', { required: true })} dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{ m: 2, width: '28ch' }} />
                </LocalizationProvider>
                <Typography style={{
                    marginLeft: 16,
                    marginBottom: -10,
                    color: "#63625B",
                }}>
                    end on:
                </Typography>
                <LocalizationProvider {...register('endDate', { required: true })} dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{ m: 2, width: '28ch' }} />
                </LocalizationProvider>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                }}>
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