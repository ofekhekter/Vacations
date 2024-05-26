import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/loginSlice";
import { emailAddress } from "../../features/emailSlice";
import { userRole } from "../../features/adminSlice";
import Checkbox from '@mui/material/Checkbox';
import "./navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();
    const loginState = useSelector((state: any) => state.login.text);
    const userEmail = useSelector((state: any) => state.emailAddress.text);
    const isAdmin = useSelector((state: any) => state.userRole.isAdmin);
    const dispatch = useDispatch();
    const [checkedFollowings, setCheckedFollowings] = React.useState(false);
    const [checkedUpcoming, setCheckedUpcoming] = React.useState(false);
    const [checkedCurrently, setCheckedCurrently] = React.useState(false);

    const handleChangeFollowings = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedFollowings(event.target.checked);
    };
    const handleChangeUpcoming = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedUpcoming(event.target.checked);
    };
    const handleChangeCurrently = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedCurrently(event.target.checked);
    };

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

    const handleCardClicked = () => {
        navigate('/userpage');
    }

    const handleVacationClicked = () => {
        navigate('/addvacation');
    }

    return (
        <AppBar className="appBar" position="static" style={{ backgroundColor: "#153448" }}>
            <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>
                <Box sx={{ display: "flex" }}>
                    <Typography variant="h4" sx={{}} component="div">
                        Vacations
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "15px" }}>
                        Followings
                        <Checkbox
                            checked={checkedFollowings}
                            onChange={handleChangeFollowings}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "15px" }}>
                        Upcoming
                        <Checkbox
                            checked={checkedUpcoming}
                            onChange={handleChangeUpcoming}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "15px" }}>
                        Currently
                        <Checkbox
                            checked={checkedCurrently}
                            onChange={handleChangeCurrently}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: "center" }}>
                    <Typography variant="subtitle2" onClick={handleCardClicked} sx={{ marginRight: "6px" }}>
                        {userEmail}
                    </Typography>
                    {isAdmin ? <Button onClick={handleVacationClicked} sx={{ color: "#B0EBB4", border: "1px solid white", marginRight: "6px" }}>Add Vacation</Button> : <span></span>}
                    <Button onClick={handleSigninClicked} color="inherit" sx={{ border: "1px solid white" }}>{loginState}</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};