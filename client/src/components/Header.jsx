import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../assets/logo.png';

function Header({user, setUser})
{
    const pages = [
        {title: 'Cats', path: '/pets/cats'},
        {title: 'Dogs', path: '/pets/dogs'},
        {title: 'Adopted', path: '/pets/adopted'}
    ]
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    if (user)
        pages.push({title: 'Add', path: '/pets/add'})

    function logout() {
        setAnchorElUser(null)
        setUser(null)
        navigate('/login')
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton component={Link} to={'/'} size="large" edge="start" color="inherit" sx={{display: {xs: 'none', md: 'flex'}, mr: 2}}>
                        <Box component='img' src={logo} alt='logo' width={56} height={56} />
                    </IconButton>
                    <MenuItem component={Link} to='/' sx={{display: {xs: 'none', md: 'flex'}, mr: 2}}>
                        <Typography variant="h5"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                            NERO ANIMALS
                        </Typography>
                    </MenuItem>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton size="large" color="inherit" onClick={e => setAnchorElNav(e.currentTarget)}>
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                            transformOrigin={{vertical: 'top', horizontal: 'left'}}
                            keepMounted
                            open={Boolean(anchorElNav)}
                            onClose={() => setAnchorElNav(null)}
                            sx={{display: {xs: 'block', md: 'none'}}}>
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={() => setAnchorElNav(null)} component={Link} to={page.path}>
                                    <Typography textAlign="center" sx={{pr: 5}}>{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <IconButton component={Link} to={'/'} size="large" edge="start" color="inherit" sx={{display: {xs: 'flex', md: 'none'}, mr: 2}}>
                        <Box component='img' src={logo} alt='logo' width={32} height={32} />
                    </IconButton>
                    <Box sx={{display: {xs: 'block', md: 'none'}, flexGrow: 1, mr: 2}}>
                        <MenuItem component={Link} to='/' sx={{display: 'inline-block'}}>
                            <Typography variant="h5"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}>
                                NERO ANIMALS
                            </Typography>
                        </MenuItem>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <MenuItem key={page.title} onClick={() => setAnchorElNav(null)} component={Link} to={page.path}>
                                {page.title}
                            </MenuItem>
                        ))}
                    </Box>
                    {
                        user && (
                            <Box sx={{flexGrow: 0}}>
                                <IconButton onClick={e => setAnchorElUser(e.currentTarget)} sx={{p: 0}}>
                                    <AccountCircleIcon fontSize='large' sx={{color: 'secondary.main'}} />
                                </IconButton>
                                <Menu
                                    sx={{mt: '45px'}}
                                    keepMounted
                                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={() => setAnchorElUser(null)}>
                                    <MenuItem onClick={logout}>
                                        <Typography textAlign="center">Sign out</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header
