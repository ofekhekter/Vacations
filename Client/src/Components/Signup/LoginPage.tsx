import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginFormModel } from "../../Models/RegisterFormModel";
import { LoginCredentials } from "../../Models/UserModel";
import { useState } from "react";
import { SigninUser, checkIsAdmin } from "../../services/usersServices";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { login } from "../../features/loginSlice";
import { emailAddress } from "../../features/emailSlice";
import { userRole } from "../../features/adminSlice";
import './login.css';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginFormModel>();
    const [loginExists, setLoginExists] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const submit = async (registerForm: LoginFormModel) => {
        try {
            const user = {
                "email": registerForm.email,
                "password": registerForm.password,
            } as LoginCredentials;
            const response = await SigninUser(user);
            if (response === undefined) {
                setLoginExists(false);
            }
            else {
                localStorage.setItem('token', response);
                const result = await checkIsAdmin({ email: registerForm.email });
                dispatch(userRole(result));
                dispatch(login("Logout"));
                dispatch(emailAddress(registerForm.email));
                setLoginExists(true);
                navigate("/userpage");
            }
        } catch {
            console.log("error");
        }
    }

    return <div className="boxContainer">
        <form onSubmit={handleSubmit(submit)} noValidate>
            <Box
                sx={{
                    backgroundColor: "#FFFFFF",
                    width: "400px",
                    alignItems: "center",
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '3px 3px 13px 5px #153448',
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
            >
                <Typography gutterBottom variant="h5" component="div"
                    style={{ marginLeft: "250px" }}
                    color={{ color: "#153448" }}
                >
                    Login
                </Typography>
                <TextField id="outlined-basic4" label="email" variant="outlined" required {...register('email', { required: true })} />
                <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password2">Password</InputLabel>
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
                <Button variant="outlined" type="submit">Login</Button>
                {loginExists ? <span className="members">don't have account?</span> : <span className="userExists">incorrerct username or password</span>}
                <h4 className="login" onClick={() => {
                    navigate('/signup');
                }}>Register Now</h4>
            </Box>
        </form>
    </div>
}
