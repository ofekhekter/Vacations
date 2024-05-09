import { VacationType } from "../Signup/VacationModel";
import Card from '@mui/material/Card';
import { CardHeader, FormControl, TextField, Typography } from "@mui/material";
import './vacationCard.css';

interface VacationCardProps {
    vacation?: VacationType;
    isEditable: boolean;
}

export const VacationCard = ({ vacation, isEditable }: VacationCardProps) => {
    return <section className="VacationContainer">
        <Card sx={{
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
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
            <FormControl>
                <TextField
                    id="outlined-full-width"
                    label="destination"
                    style={{ margin: 8 }}
                    placeholder="add destination"
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                <TextField
                    id="outlined-full-width"
                    label="description"
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    style={{ margin: 8 }}
                />
            </FormControl>
        </Card>
    </section>
}