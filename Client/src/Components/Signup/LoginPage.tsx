import { Box, Button, TextField, Typography } from "@mui/material"
import './signup.css';
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();
    return <div className="boxContainer">
        <Box
            component="form"
            sx={{
                backgroundColor: "#F6F5F2",
                width: "400px",
                boxShadow: 6,
                alignItems: "center",
                display: 'flex',
                flexDirection: 'column',
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Typography gutterBottom variant="h5" component="div"
                style={{ marginLeft: "250px" }}
                color={{ color: "#153448" }}
            >
                Login
            </Typography>
            <TextField id="outlined-basic" label="email" variant="outlined" />
            <TextField id="outlined-basic" label="password" variant="outlined" />
            <Button variant="outlined">Login</Button>
            <span className="members">don't have account?</span>
            <h4 className="login" onClick={() => {
                navigate('/signup');
            }}>Register now</h4>
        </Box>
    </div>
}