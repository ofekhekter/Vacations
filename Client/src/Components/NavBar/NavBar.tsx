import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/loginSlice";
import { emailAddress } from "../../features/emailSlice";
import "./navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();
    const loginState = useSelector((state: any) => state.login.text);
    const userEmail = useSelector((state: any) => state.emailAddress.text);
    const isAdmin = useSelector((state: any) => state.admin);
    const dispatch = useDispatch();

    const handleSigninClicked = () => {
        if (loginState === 'Login') {
            navigate('/signin');
        } else {
            dispatch(login("Login"));
            dispatch(emailAddress(""));
            navigate('/home');
        }
    }

    const handleHomeClicked = () => {
        navigate('/home');
    }

    const handleCardClicked = () => {
        navigate('/userPage');
    }

    const handleVacationClicked = () => {
        navigate('/addvacation');
    }

    return (
        <AppBar className="appBar" position="static" style={{ backgroundColor: "#153448" }}>
            <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>
                <Typography onClick={handleHomeClicked} variant="h6" component="div">
                    Vacations
                </Typography>
                {isAdmin ? <Button onClick={handleVacationClicked} sx={{ color: "#B0EBB4" }}>Add Vacation</Button> : <span></span>}
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                    <Typography variant="subtitle2" onClick={handleCardClicked} component="address">
                        {userEmail}
                    </Typography>
                    <Button onClick={handleSigninClicked} color="inherit">{loginState}</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};