import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterFormModel } from "../../Models/RegisterFormModel";
import { UserType } from "../../Models/UserModel";
import { SignupUser } from "../../services/usersServices";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { login } from "../../features/loginSlice";
import { emailAddress } from "../../features/emailSlice";
import './login.css';


export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<RegisterFormModel>();
    const [userExists, setUserExists] = useState<boolean>(false);
    const [userResponse, setUserResponse] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useDispatch()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const submit = async (registerForm: RegisterFormModel) => {
        try {
            const newUser = {
                firstName: registerForm.firstName,
                lastName: registerForm.lastName,
                email: registerForm.email,
                password: registerForm.password,
            } as UserType;
            const response = await SignupUser(newUser);
            if (response.status !== 201) {
                setUserExists(true);
                setUserResponse(response);
            } else {
                localStorage.setItem('token', response.data);
                setUserExists(false);
                dispatch(login("Logout"));
                dispatch(emailAddress(registerForm.email));
                navigate('/userpage');
            }
        } catch {
            console.log("error");
        }
    }

    return <div className="boxContainer">
        <Box
            onSubmit={handleSubmit(submit)}
            component="form"
            sx={{
                backgroundColor: "#FFFFFF",
                width: "400px",
                alignItems: "center",
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '3px 3px 13px 5px #153448',
                '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
        >
            <Typography gutterBottom variant="h5" component="div"
                sx={{
                    marginLeft: "250px",
                    color: "#153448",
                    textAlign: 'center'
                }}
            >
                Register
            </Typography>
            <TextField id="outlined-basic1" label="first name" variant="outlined" required {...register('firstName', { required: true })} />
            <TextField id="outlined-basic2" label="last name" variant="outlined" required {...register('lastName', { required: true })} />
            <TextField id="outlined-basic3" label="email" variant="outlined" required {...register('email', { required: true })} />
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password1">Password</InputLabel>
                <OutlinedInput
                    {...register('password', { required: true })}
                    name="password"
                    autoComplete="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <Button variant="outlined" type="submit">Register</Button>
            {userExists ? <span className="userExists">{userResponse}</span> :
                <span className="members">already a member?</span>}
            <h4 className="login" onClick={() => {
                navigate('/signin');
            }}>login</h4>
        </Box>
    </div>
}