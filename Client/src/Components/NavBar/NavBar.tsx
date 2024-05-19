import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/loginSlice";
import { emailAddress } from "../../features/emailSlice";
import { userRole } from "../../features/adminSlice";
import "./navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();
    const loginState = useSelector((state: any) => state.login.text);
    const userEmail = useSelector((state: any) => state.emailAddress.text);
    const isAdmin = useSelector((state: any) => state.userRole.isAdmin);
    const dispatch = useDispatch();

    const handleSigninClicked = () => {
        if (loginState === 'Login') {
            navigate('/signin');
        } else {
            localStorage.removeItem("token");
            dispatch(login("Login"));
            dispatch(emailAddress(""));
            dispatch(userRole(false));
            navigate('/home');
        }
    }

    const handleHomeClicked = () => {
        navigate('/home');
    }

    const handleCardClicked = () => {
        navigate('/userpage');
    }

    const handleVacationClicked = () => {
        navigate('/addvacation');
    }

    return (
        <AppBar className="appBar" position="static" style={{ backgroundColor: "#153448" }}>
            <Toolbar sx={{ display: 'flex', justifyContent: "space-between"}}>
                <Typography onClick={handleHomeClicked} variant="h6" component="div">
                    Home
                </Typography>
                <Box sx={{display: "flex"}}>
                    <Typography variant="h4" sx={{}} component="div">
                        Vacations
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: "center" }}>
                    <Typography variant="subtitle2" onClick={handleCardClicked} sx={{marginRight: "6px"}}>
                        {userEmail}
                    </Typography>
                    {isAdmin ? <Button onClick={handleVacationClicked} sx={{ color: "#B0EBB4", border: "1px solid white", marginRight: "6px" }}>Add Vacation</Button> : <span></span>}
                    <Button onClick={handleSigninClicked} color="inherit" sx={{ border: "1px solid white" }}>{loginState}</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};