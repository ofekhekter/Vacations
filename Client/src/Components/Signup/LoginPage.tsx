import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginFormModel } from "../../Models/RegisterFormModel";
import { LoginCredentials } from "../../Models/UserModel";
import { useState } from "react";
import { SigninUser } from "../../services/usersServices";
import './login.css';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginFormModel>();
    const [loginExists, setLoginExists] = useState<boolean>(true);

    const submit = async (registerForm: LoginFormModel) => {
        try {
            const user = {
                "email": registerForm.email,
                "password": registerForm.password,
            } as LoginCredentials;
            const response = await SigninUser(user);
            if (response === undefined) setLoginExists(false);
            else setLoginExists(true);
        } catch {
            console.log("error");
        }
    }

    return <div className="boxContainer">
        <Box
            onSubmit={handleSubmit(submit)}
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
            <TextField id="outlined-basic" label="email" variant="outlined" required {...register('email', { required: true })} />
            <TextField id="outlined-basic" label="password" variant="outlined" required {...register('password', { required: true })} />
            <Button variant="outlined" type="submit">Login</Button>
            {loginExists ? <span className="members">don't have account?</span> : <span className="userExists">incorrerct username or password</span>}
            <h4 className="login" onClick={() => {
                navigate('/signup');
            }}>Register Now</h4>
        </Box>
    </div>
}