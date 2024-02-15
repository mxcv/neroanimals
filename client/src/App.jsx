import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Alert, Box, Snackbar, Container, Backdrop, CircularProgress, createTheme, ThemeProvider} from "@mui/material";
import Home from "./components/Home"
import Login from "./components/Login"
import PetInfo from "./components/PetInfo.jsx";
import PetSave from "./components/PetSave.jsx"
import Header from "./components/Header.jsx";
import PetList from "./components/PetList.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const theme = createTheme({
        palette: {
            primary: {
                main: '#c18953'
            },
            secondary: {
                main: '#fddfc4'
            }
        }
    })

    function handleSetUser(user) {
        if (user === null)
            localStorage.removeItem('user')
        else
            localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <BrowserRouter>
                    <Header user={user} setUser={handleSetUser} />
                    <Container maxWidth="md" component='main' sx={{flex: 1, display: 'flex', padding: 3}}>
                        <Routes>
                            <Route path='/' element={<Home setError={setError} />}></Route>
                            <Route path='/pets/cats' element={<PetList key='cat' setError={setError} withEndStory={false} petType='CAT' />}></Route>
                            <Route path='/pets/dogs' element={<PetList key='dog' setError={setError} withEndStory={false} petType='DOG' />}></Route>
                            <Route path='/pets/adopted' element={<PetList key='adopted' setError={setError} withEndStory={true} petType={null} />}></Route>
                            <Route path='/pets/:id' element={<PetInfo user={user} setError={setError} />}></Route>
                            <Route path='/pets/:id/edit' element={<PetSave setIsLoading={setIsLoading} setError={setError} />}></Route>
                            <Route path='/pets/add' element={<PetSave setIsLoading={setIsLoading} setError={setError} />}></Route>
                            <Route path='/login' element={<Login setUser={handleSetUser} setIsLoading={setIsLoading} setError={setError} />}></Route>
                        </Routes>
                    </Container>
                    <Footer />
                    <Backdrop open={isLoading} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Snackbar
                        open={error !== null}
                        onClose={() => setError(null)}
                        autoHideDuration={5000}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                            {error === '' ? 'Connection error' : error}
                        </Alert>
                    </Snackbar>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    )
}

export default App
