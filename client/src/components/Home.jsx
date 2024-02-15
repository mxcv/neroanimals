import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Box, Paper, Stack, Typography, Button, Grid, List, ListItem, ListItemText, ListItemIcon, Skeleton} from "@mui/material";
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import ImageGallery from "react-image-gallery";
import axios from "../axios.jsx";

function renderPicture(item) {
    return (
        <Link to={item.link}>
            <Box component='img' className='image-gallery-image' src={item.original} alt={item.originalAlt}/>
        </Link>
    )
}

function Home({setError}) {
    const bannerPetsCount = 7;
    const [bannerPets, setBannerPets] = useState(null)

    useEffect(() => loadPets(), [])

    function loadPets() {
        axios.get('/pets/random', {
                params: {
                    count: bannerPetsCount
                }
            })
            .then(r => {
                setBannerPets(r.data.map(pet => {
                    let pictureId = pet.beginStory.pictures[Math.floor(Math.random() * pet.beginStory.pictures.length)]
                    return {
                        original: new URL(axios.defaults.baseURL).origin + '/pictures/' + pictureId,
                        link: 'pets/' + pet.id
                    }
                }))
            })
            .catch(() => setError(''))
    }

    return (
        <Stack gap={2} sx={{width: '100%'}}>
            {
                bannerPets === null ? (
                    <Skeleton variant='rounded' height={300}></Skeleton>
                ) : (
                    <Paper elevation={4}>
                        <ImageGallery items={bannerPets} renderItem={renderPicture} showPlayButton={false} showBullets={true} showFullscreenButton={false} autoPlay={true} slideDuration={800} slideInterval={4000} />
                    </Paper>
                )
            }
            <Paper sx={{p: 2}} elevation={4}>
                <Typography>
                    We are not responsible for events after the adoptions and problems with the adopted animals have to be resolved by the adopter, IN THE INTEREST OF THE ANIMALS.
                    Message for our adopters.
                </Typography>
                    <List disablePadding>
                        <ListItem sx={{pl: 0}}>
                            <ListItemIcon sx={{justifyContent: 'center'}}>
                                <CircleRoundedIcon sx={{fontSize: 10, color: 'primary.main'}} />
                            </ListItemIcon>
                            <ListItemText>
                                Please be informed we don't pay any money back if the animals have to leave the new home.
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{pl: 0}}>
                            <ListItemIcon sx={{justifyContent: 'center'}}>
                                <CircleRoundedIcon sx={{fontSize: 10, color: 'primary.main'}} />
                            </ListItemIcon>
                            <ListItemText>
                                Please take into consideration that all animals need time to acclimate with new owners and possibly with other animals of the adopter. Animals must be given the necessary time for this.
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{pl: 0}}>
                            <ListItemIcon sx={{justifyContent: 'center'}}>
                                <CircleRoundedIcon sx={{fontSize: 10, color: 'primary.main'}} />
                            </ListItemIcon>
                            <ListItemText>
                                People have to sterilize all animals if they haven’t already been sterilized.
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{pl: 0}}>
                            <ListItemIcon sx={{justifyContent: 'center'}}>
                                <CircleRoundedIcon sx={{fontSize: 10, color: 'primary.main'}} />
                            </ListItemIcon>
                            <ListItemText>
                                Please be informed we don’t take any responsibility if the animals destroy things in the house or outside.
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{pl: 0}}>
                            <ListItemIcon sx={{justifyContent: 'center'}}>
                                <CircleRoundedIcon sx={{fontSize: 10, color: 'primary.main'}} />
                            </ListItemIcon>
                            <ListItemText>
                                We do not pay veterinary costs after the adoption has been completed.
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{pl: 0}}>
                            <ListItemIcon sx={{justifyContent: 'center'}}>
                                <CircleRoundedIcon sx={{fontSize: 10, color: 'primary.main'}} />
                            </ListItemIcon>
                            <ListItemText>
                                We do not pay extra transport costs after the adoption.
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{pl: 0}}>
                            <ListItemIcon sx={{justifyContent: 'center'}}>
                                <CircleRoundedIcon sx={{fontSize: 10, color: 'primary.main'}} />
                            </ListItemIcon>
                            <ListItemText>
                                If the animal would become ill, the new owner must promise to go to the veterinarian.
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{pl: 0}}>
                            <ListItemIcon sx={{justifyContent: 'center'}}>
                                <CircleRoundedIcon sx={{fontSize: 10, color: 'primary.main'}} />
                            </ListItemIcon>
                            <ListItemText>
                                The adopters have to be patient with the animals, because the animals  arrive in a new place and they are extra vulnerable as they come from a war zone.
                            </ListItemText>
                        </ListItem>
                    </List>
                <Typography textAlign='right'>Thank you.</Typography>
            </Paper>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Button component={Link} to='/pets/cats' fullWidth variant='contained'>Cats</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button component={Link} to='/pets/dogs' fullWidth variant='contained'>Dogs</Button>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Home
