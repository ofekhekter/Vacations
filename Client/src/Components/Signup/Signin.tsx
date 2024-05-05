import { Box, Button, TextField, Typography } from "@mui/material"


export const Signin = () => {
    return <>
        <Box
            component="form"
            sx={{
                alignItems: "center",
                display: 'flex',
                flexDirection: 'column',
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Typography gutterBottom variant="h5" component="div"
            style={{marginLeft:"250px"}}
            color={{color: "#153448"}}
            >
                Register
            </Typography>
            <TextField id="outlined-basic" label="first name" variant="outlined" />
            <TextField id="outlined-basic" label="last name" variant="outlined" />
            <TextField id="outlined-basic" label="email" variant="outlined" />
            <TextField id="outlined-basic" label="password" variant="outlined" />
            <Button variant="outlined">Register</Button>
        </Box>
    </>
}