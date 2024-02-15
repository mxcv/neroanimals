import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Typography, Box, Button, Avatar, TextField} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "../axios.jsx";

function Login({setUser, setIsLoading, setError}) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        axios.post('/user/login', {
                username: username,
                password: password
            })
            .then((response) => {
                setUser(response.data)
                navigate('/')
            })
            .catch(() => setError('Username or password are incorrect'))
            .finally(() => setIsLoading(false))
    }

    return (
        <Container maxWidth="xs" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        inputProps={{required: true}}
                        fullWidth
                        label="Username"
                        autoComplete="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                    <TextField
                        margin="normal"
                        inputProps={{required: true}}
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign in</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Login
