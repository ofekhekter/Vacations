import Card from '@mui/material/Card';
import { VacationType } from "../Signup/VacationModel";
import { Button, CardHeader, Divider, FormControl, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './vacationCard.css';


interface VacationCardProps {
    vacation?: VacationType;
    isEditable: boolean;
}

export const VacationCard = ({ vacation, isEditable }: VacationCardProps) => {

    return <section className="VacationContainer">
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#F8F6E3',
            width: "400px",
            boxShadow: '3px 2px 3px 1px #153448',
        }}>
            <CardHeader sx={{
                display: 'flex',
                flexDirection: 'column',
                color: "#153448",
            }}
                title='Add Vacation'
            />
            <Divider variant="middle" />
            <FormControl>
                <TextField
                    id="outlined-full-width"
                    label="destination"
                    required
                    variant="outlined"
                    style={{ margin: 16 }}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="description"
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    style={{ margin: 16 }}
                />
            </FormControl>
            <Typography style={{ marginLeft: 16 }}>
                start date:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{ m: 2, width: '28ch' }} />
            </LocalizationProvider>
            <Typography style={{ marginLeft: 16 }}>
                end date:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{ m: 2, width: '28ch' }} />
            </LocalizationProvider>
            <Button variant="outlined" type="submit">Add Vacation</Button>
        </Card>
    </section>
}