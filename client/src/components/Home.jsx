import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Box, Paper, Stack, Typography, List, ListItem, ListItemText, ListItemIcon, Skeleton, IconButton, Icon} from "@mui/material";
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import ImageGallery from "react-image-gallery";
import axios from "../axios.jsx";
import CatIcon from '../assets/cat.svg'
import DogIcon from '../assets/dog.svg'

function renderPicture(item) {
    return (
        <Link to={item.link}>
            <Box component='img' className='image-gallery-image' src={item.original} alt={item.originalAlt}/>
        </Link>
    )
}

function renderIconButtonWithTitle(imagePath, title, linkPath) {
    return (
        <Link to={linkPath}>
            <IconButton>
                <Stack>
                    <Icon sx={{width: {xs: 70, md: 100}, height: 'auto'}}>
                        <Box component='img' src={imagePath} sx={{width: '100%', height: '100%', objectFit: 'contain'}}/>
                    </Icon>
                    <Typography>{title}</Typography>
                </Stack>
            </IconButton>
        </Link>
    )
}

function ListItemIconText({children}) {
    return (
        <ListItem disablePadding>
            <ListItemIcon sx={{minWidth: 30}}>
                <CircleRoundedIcon sx={{fontSize: 10, color: 'primary.main'}} />
            </ListItemIcon>
            <ListItemText>{children}</ListItemText>
        </ListItem>
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
            <Stack direction='row' sx={{justifyContent: 'space-evenly', my: 2}}>
                {renderIconButtonWithTitle(CatIcon, 'CATS', 'pets/cats')}
                {renderIconButtonWithTitle(DogIcon, 'DOGS', 'pets/dogs')}
            </Stack>
            <Paper sx={{p: 2}} elevation={4}>
                <Typography>
                    We are not responsible for events after the adoptions and problems with the adopted animals have
                    to be resolved by the adopter, IN THE INTEREST OF THE ANIMALS. Message for our adopters.
                </Typography>
                    <List>
                        <ListItemIconText>
                            Please be informed we don't pay any money back if the animals have to leave the new home.
                        </ListItemIconText>
                        <ListItemIconText>
                            Please take into consideration that all animals need time to acclimate
                            with new owners and possibly with other animals of the adopter.
                            Animals must be given the necessary time for this.
                        </ListItemIconText>
                        <ListItemIconText>
                            People have to sterilize all animals if they haven’t already been sterilized.
                        </ListItemIconText>
                        <ListItemIconText>
                            Please be informed we don’t take any responsibility if the animals destroy things in the
                            house or outside.
                        </ListItemIconText>
                        <ListItemIconText>
                            We do not pay veterinary costs after the adoption has been completed.
                        </ListItemIconText>
                        <ListItemIconText>
                            We do not pay extra transport costs after the adoption.
                        </ListItemIconText>
                        <ListItemIconText>
                            If the animal would become ill, the new owner must promise to go to the veterinarian.
                        </ListItemIconText>
                        <ListItemIconText>
                            The adopters have to be patient with the animals, because the animals  arrive in a new
                            place and they are extra vulnerable as they come from a war zone.
                        </ListItemIconText>
                    </List>
                <Typography textAlign='right'>Thank you.</Typography>
            </Paper>
        </Stack>
    )
}

export default Home
