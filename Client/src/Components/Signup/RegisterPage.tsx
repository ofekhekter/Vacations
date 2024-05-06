import { Box, Button, TextField, Typography } from "@mui/material"
import './signup.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RegisterFormModel from "../../Models/RegisterFormModel";


export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<RegisterFormModel>();


    const submit = (registerForm: RegisterFormModel) => {
        console.log("register:", registerForm);
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
                Register
            </Typography>
            <TextField id="outlined-basic" label="first name" variant="outlined" required {...register('firstName', { required: true })} />
            <TextField id="outlined-basic" label="last name" variant="outlined" required {...register('lastName', { required: true })} />
            <TextField id="outlined-basic" label="email" variant="outlined" required {...register('email', { required: true })} />
            <TextField id="outlined-basic" label="password" variant="outlined" required {...register('password', { required: true })} />
            <Button variant="outlined" type="submit">Register</Button>
            <span className="members">already a member?</span>
            <h4 className="login" onClick={() => {
                navigate('/signin');
            }}>login</h4>
        </Box>
    </div>
}