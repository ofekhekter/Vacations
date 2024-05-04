import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import "./navbar.css";

export const Navbar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="appBar" position="static" style={{backgroundColor: "#153448"}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 3 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Vacations
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box >
    );
};