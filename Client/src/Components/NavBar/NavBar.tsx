import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleSigninClicked = () => {
        navigate('/signin');
    }

    const handleHomeClicked = () => {
        navigate('/home');
    }

    const handleVacationClicked = () => {
        navigate('/addvacation');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="appBar" position="static" style={{ backgroundColor: "#153448" }}>
                <Toolbar>
                    <Typography onClick={handleHomeClicked} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Vacations
                    </Typography>
                    <Button onClick={handleSigninClicked} color="inherit">Login</Button>
                    <Button onClick={handleVacationClicked} color="inherit">Add Vacation</Button>
                </Toolbar>
            </AppBar>
        </Box >
    );
};