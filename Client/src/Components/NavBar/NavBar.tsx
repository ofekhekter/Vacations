import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
    const navigate = useNavigate();
    const [clickLogin, setClickLogin] = useState<Boolean>(false);

    const handleSigninClicked = () => {
        setClickLogin(true);
        navigate('/signin');
    }

    const handleHomeClicked = () => {
        navigate('/home');
    }

    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className="appBar" position="static" style={{ backgroundColor: "#153448" }}>
                    <Toolbar>
                        <Typography onClick={handleHomeClicked} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Vacations
                        </Typography>
                        <Button onClick={handleSigninClicked} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box >
    );
};