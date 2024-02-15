import {useEffect, useState} from "react";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Link, Grid, Paper, Button, Stack, Typography, Box, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "../axios.jsx";
import countries from '../assets/countries.json'

function PetInfo({user, setError}) {

    const navigate = useNavigate()
    const params = useParams()
    const [pet, setPet] = useState()

    useEffect(() => loadPet())

    function loadPet() {
        axios.get('/pets/' + params.id)
            .then(r => setPet(r.data))
            .catch(() => setError(''))
    }

    function deletePet() {
        axios.delete('/pets/' + params.id)
            .then(() => navigate('/'))
            .catch(() => setError(''))
    }

    function getPetPictures(pet) {
        function getPictureUrl(id) {
            return new URL(axios.defaults.baseURL).origin + "/pictures/" + id
        }
        function getStoryPictures(story) {
            return story === null ? [] : story.pictures.map(id => ({original: getPictureUrl(id), thumbnail: getPictureUrl(id)}))
        }
        return [...getStoryPictures(pet.beginStory), ...getStoryPictures(pet.endStory)]
    }

    function getLocationString(story) {
        return countries.find(c => c.code === story.countryCode)?.name + (story.city ? (', ' + story.city) : '')
    }

    function getDateString(story) {
        return new Date(story.date).toLocaleDateString()
    }

    function renderAdminSection() {
        if (user)
            return (
                <Stack gap={2}>
                    <Button fullWidth variant='contained' color='warning' component={RouterLink} to={"/pets/" + params.id + '/edit'}>Edit</Button>
                    <Button fullWidth variant='contained' color='error' onClick={deletePet}>Remove</Button>
                </Stack>
            )
    }

    function renderListSection(story, phoneNumber) {
        return (
            <List disablePadding>
                {
                    phoneNumber && (
                        <ListItem disablePadding>
                            <ListItemIcon ><WhatsAppIcon color='success' /></ListItemIcon>
                            <ListItemText><Link href={'tel:' + phoneNumber}>{phoneNumber}</Link></ListItemText>
                        </ListItem>
                    )
                }
                <ListItem disablePadding>
                    <ListItemIcon><PlaceOutlinedIcon color='warning' /></ListItemIcon>
                    <ListItemText>{getLocationString(story)}</ListItemText>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon><CalendarMonthOutlinedIcon color='error' /></ListItemIcon>
                    <ListItemText>{getDateString(story)}</ListItemText>
                </ListItem>
            </List>
        )
    }

    return (
        pet && (
            <Box sx={{width: '100%'}}>
                {
                    getPetPictures(pet).length ? (
                        <Paper elevation={4}>
                            <ImageGallery showPlayButton={false} items={getPetPictures(pet)} />
                        </Paper>
                    ) : null
                }
                {
                    pet.endStory ? (
                        <Stack sx={{mt: 2}} spacing={2}>
                            <Typography variant='h4'>{pet.title}</Typography>
                            <Paper sx={{p: 2}} elevation={4}>
                                {renderListSection(pet.beginStory)}
                                <Typography variant='body1' sx={{mt: 2}}>{pet.beginStory.description}</Typography>
                            </Paper>
                            <Stack direction='row' sx={{justifyContent: 'space-evenly'}}>
                                <KeyboardDoubleArrowDownIcon color='success' sx={{ fontSize: 60 }} />
                                <KeyboardDoubleArrowDownIcon color='success' sx={{ fontSize: 60 }} />
                                <KeyboardDoubleArrowDownIcon color='success' sx={{ fontSize: 60, display: { xs: 'none', sm: 'inherit' }}} />
                            </Stack>
                            <Paper sx={{p: 2}} elevation={4}>
                                {renderListSection(pet.endStory)}
                                <Typography variant='body1' sx={{mt: 2}}>{pet.endStory.description}</Typography>
                            </Paper>
                            {renderAdminSection()}
                        </Stack>
                    ) : (
                        <Grid container sx={{mt: 1}} spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Paper sx={{p: 2}} elevation={4}>
                                    <Typography variant='h4'>{pet.title}</Typography>
                                    <Typography variant='body1' sx={{mt: 2}}>{pet.beginStory.description}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={2}>
                                    <Paper sx={{p: 2}} elevation={4}>
                                        {renderListSection(pet.beginStory, pet.phoneNumber)}
                                    </Paper>
                                    {renderAdminSection()}
                                </Stack>
                            </Grid>
                        </Grid>
                    )
                }
            </Box>
        )
    )
}

export default PetInfo
