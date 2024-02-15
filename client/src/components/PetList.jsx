import axios from "../axios.jsx";
import {useEffect, useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import {Pagination, Paper, Skeleton, Stack, Typography, Box, Link} from "@mui/material";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import countries from '../assets/countries.json'

function PetList({setError, withEndStory, petType}) {
    const pageSize = 10
    const [pageNumber, setPageNumber] = useState(1)
    const [pets, setPets] = useState(null)
    const [totalCount, setTotalCount] = useState()

    useEffect(() => loadPets(pageNumber), [pageNumber])

    function loadPets(pageNumber) {
        axios.get('/pets', {
            params: {
                pageNumber: pageNumber - 1,
                pageSize: pageSize,
                withEndStory: withEndStory,
                petType: petType
            }
        })
            .then(r => {
                setTotalCount(r.data.total)
                setPets(r.data.list)
            })
            .catch(() => setError(''))
    }

    return (
        <Box sx={{width: '100%'}}>
            <Stack gap={2} sx={{width: '100%'}}>
                {
                    pets === null ? (
                        Array.from({length: pageSize}, (v, i) => (
                            <Box key={i} sx={{width: '100%', p: 0.5}}>
                                <Stack direction="row">
                                    <Skeleton variant='rounded' sx={{width: {xs: 140, md: 240}, height: {xs: 105, md: 180}}} />
                                    <Stack sx={{flex: 1, justifyContent: 'space-between', ml: 1}}>
                                        <Typography variant='h6'><Skeleton /></Typography>
                                        <Stack direction='row' sx={{justifyContent: 'space-between'}}>
                                            <Skeleton width='30%' />
                                            <Skeleton width='15%' />
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Box>
                        ))
                    ) : (
                        pets.map(p => {
                            const story = p.endStory ?? p.beginStory
                            const pictures = p.endStory && p.endStory.pictures.length ? p.endStory.pictures : p.beginStory.pictures
                            return (
                                <Paper key={p.id} sx={{width: '100%', p: 1}} elevation={4}>
                                    <Stack direction="row">
                                        <Link component={RouterLink} to={"/pets/" + p.id}>
                                            {
                                                pictures.length ? (
                                                    <Paper component="img" variant='outlined'
                                                           sx={{objectFit: 'contain', width: {xs: 140, md: 240}, height: {xs: 105, md: 180}}}
                                                           src={new URL(axios.defaults.baseURL).origin + "/pictures/" + pictures[0]} />
                                                ) : (
                                                    <Paper variant='outlined'
                                                           sx={{width: {xs: 140, md: 240}, height: {xs: 105, md: 180}}}>
                                                        <ImageNotSupportedIcon sx={{width: '100%', height: '100%'}}/>
                                                    </Paper>
                                                )
                                            }
                                        </Link>
                                        <Stack sx={{flex: 1, justifyContent: 'space-between', ml: 1}}>
                                            <Link component={RouterLink} to={"/pets/" + p.id} variant="h6">{p.title}</Link>
                                            <Stack direction='row' sx={{justifyContent: 'space-between'}}>
                                                <Typography variant='subtitle2'>{countries.find(c => c.code === story.countryCode)?.name + (story.city ? (', ' + story.city) : '')}</Typography>
                                                <Typography variant='subtitle2'>{new Date(story.date).toLocaleDateString()}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            )
                        })
                    )
                }
            </Stack>
            {
                pets !== null && (
                    <Box sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
                        <Pagination variant="outlined"
                                    color="primary"
                                    count={Math.ceil(totalCount / pageSize)}
                                    page={pageNumber}
                                    onChange={(e, n) => setPageNumber(n)} />
                    </Box>
                )
            }
        </Box>
    )
}

export default PetList
