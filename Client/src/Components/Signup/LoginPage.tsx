import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginFormModel } from "../../Models/RegisterFormModel";
import { LoginCredentials } from "../../Models/UserModel";
import { appConfig } from "../../utils/appConfig";
import axios from "axios";
import './signup.css';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginFormModel>();

    const submit = async (registerForm: LoginFormModel) => {
        console.log("register:", registerForm);
        const user = {
            "username": registerForm.email,
            "password": registerForm.password,
        } as LoginCredentials;
        // const newUser = JSON.stringify(registerForm);
        // console.log("newUser:", newUser);
        await axios.post<string>(appConfig.post.signin, user).then(response => {
            console.log("response:", response);
        }).catch(err => {
            console.log(err)
        });
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
            <Button variant="outlined">Login</Button>
            <span className="members">don't have account?</span>
            <h4 className="login" onClick={() => {
                navigate('/signup');
            }}>Register now</h4>
        </Box>
    </div>
}