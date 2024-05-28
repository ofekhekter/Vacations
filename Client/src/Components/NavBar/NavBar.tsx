import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/loginSlice";
import { emailAddress } from "../../features/emailSlice";
import { userRole } from "../../features/adminSlice";
import Checkbox from '@mui/material/Checkbox';
import { getAllCurrentVacations, getAllFutureVacations, getAllVacationsByUserId } from '../../services/vacationsServices';
import { getUserId } from '../../services/usersServices';
import { vacations } from '../../features/vacationsSlice';
import "./navbar.css";


export const Navbar = () => {
    const navigate = useNavigate();
    const loginState = useSelector((state: any) => state.login.text);
    const userEmail = useSelector((state: any) => state.emailAddress.text);
    const isAdmin = useSelector((state: any) => state.userRole.isAdmin);
    const [checkedFollowings, setCheckedFollowings] = React.useState(false);
    const [checkedUpcoming, setCheckedUpcoming] = React.useState(false);
    const [checkedCurrently, setCheckedCurrently] = React.useState(false);
    const dispatch = useDispatch();

    const handleChangeFollowings = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setCheckedFollowings(isChecked);
        setCheckedUpcoming(false);
        setCheckedCurrently(false);

        if (isChecked) {
            const userId = await getUserId(userEmail);
            const vacationsFollowings = await getAllVacationsByUserId(userId);
            dispatch(vacations(vacationsFollowings));
            navigate("/filters");
        } else {
            navigate("/userpage");
        }
    };

    const handleChangeUpcoming = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setCheckedUpcoming(isChecked);
        setCheckedFollowings(false);
        setCheckedCurrently(false);
        if (isChecked) {
            const futureVacations = await getAllFutureVacations();
            dispatch(vacations(futureVacations));
            navigate("/filters");
        } else {
            navigate("/userpage");
        }
    };

    const handleChangeCurrently = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setCheckedCurrently(isChecked);
        setCheckedFollowings(false);
        setCheckedUpcoming(false);
        if (isChecked) {
            const currentVacations = await getAllCurrentVacations();
            dispatch(vacations(currentVacations));
            navigate("/filters");
        } else {
            navigate("/userpage");
        }
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
    };

    const handleCardClicked = () => {
        navigate('/userpage');
    };

    const handleVacationClicked = () => {
        navigate('/addvacation');
    };

    const handleReportClicked = () => {
        navigate('/reportpage');
    };

    return (
        <AppBar className="appBar" position="static" style={{ backgroundColor: "#153448" }}>
            <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>
                <Typography variant="h4" component="div">
                    Vacations
                </Typography>
                {isAdmin && <Typography variant="h5" onClick={handleCardClicked}>
                    Home
                </Typography>}
                {userEmail && !isAdmin && <Box sx={{ display: "flex" }}>
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
                </Box>}
                <Box sx={{ display: 'flex', alignItems: "center" }}>
                    <Typography variant="subtitle2" onClick={handleCardClicked} sx={{ marginRight: "6px" }}>
                        {userEmail}
                    </Typography>
                    {isAdmin && <Button onClick={handleReportClicked} sx={{ color: "#B0EBB4", border: "1px solid white", marginRight: "6px" }}>Report</Button>}
                    {isAdmin && <Button onClick={handleVacationClicked} sx={{ color: "#B0EBB4", border: "1px solid white", marginRight: "6px" }}>Add Vacation</Button>}
                    <Button onClick={handleSigninClicked} color="inherit" sx={{ border: "1px solid white" }}>{loginState}</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
