import {Link as RouterLink} from "react-router-dom";
import {Box, Container, Grid, Stack, Typography, Link} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import {blue, red, brown} from "@mui/material/colors";
import logo from '../assets/logo.png';

function Footer() {

    return (
        <Box component="footer" sx={{py: 2, px: 2, mt: 'auto', backgroundColor: brown[900]}}>
            <Container maxWidth="sm">
                <Grid container>
                    <Grid item xs={4}>
                        <RouterLink to='/'>
                            <Box component='img' src={logo} sx={{width: {xs: '80px', md: '100px'}, height: {xs: '80px', md: '100px'}}} />
                        </RouterLink>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack>
                            <Link component={RouterLink} to='pets/cats' sx={{width: 'fit-content'}} color='common.white'>
                                <Typography variant="body1">Cats</Typography>
                            </Link>
                            <Link component={RouterLink} to='pets/dogs' sx={{width: 'fit-content'}} color='common.white'>
                                <Typography variant="body1" sx={{width: 'fit-content'}}>Dogs</Typography>
                            </Link>
                            <Link component={RouterLink} to='pets/adopted' sx={{width: 'fit-content'}} color='common.white'>
                                <Typography variant="body1" sx={{width: 'fit-content'}}>Adopted</Typography>
                            </Link>
                        </Stack>
                    </Grid>
                    <Grid item xs={5}>
                        <Stack gap={1}>
                            <Stack direction='row' gap={3} sx={{justifyContent: 'flex-start'}}>
                                <RouterLink to='https://www.facebook.com/profile.php?id=100064359772615' target='_blank' rel='noopener'>
                                    <Box sx={{backgroundColor: 'common.white', borderRadius: '10px', display: 'flex', '&:hover': {backgroundColor: brown[200]}}}>
                                        <FacebookIcon fontSize='large' style={{color: blue[800]}}  />
                                    </Box>
                                </RouterLink>
                                <RouterLink to='https://www.instagram.com/rescueteamnero' target='_blank' rel='noopener'>
                                    <Box sx={{backgroundColor: 'common.white', borderRadius: '10px', display: 'flex', '&:hover': {backgroundColor: brown[200]}}}>
                                        <InstagramIcon fontSize='large' style={{color: red[600]}}  />
                                    </Box>
                                </RouterLink>
                            </Stack>
                            <Typography variant="body1" color='#ffffff'>neroteam@yahoo.com</Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Typography variant="body2" color='common.white' textAlign='center'>
                    Nero Animals. We love animals without borders.
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer
