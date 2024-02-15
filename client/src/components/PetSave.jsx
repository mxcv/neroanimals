import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Stack, MenuItem, Select, FormControl, InputLabel, Button, Grid, FormLabel, Paper,
    RadioGroup, FormControlLabel, Radio, TextField
} from "@mui/material";
import {MuiTelInput, matchIsValidTel} from 'mui-tel-input'
import dayjs from "dayjs";
import axios from "../axios.jsx";
import Story from "./Story.jsx";

function PetSave({setIsLoading, setError}) {

    const navigate = useNavigate();
    const params = useParams()
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [beginStory, setBeginStory] = useState({date: dayjs(), countryCode: 'UA', city: null, description: null})
    const [endStory, setEndStory] = useState({date: dayjs(), countryCode: '', city: null, description: null})
    const [beginStoryPictures, setBeginStoryPictures] = useState([])
    const [endStoryPictures, setEndStoryPictures] = useState([])
    const [isOwnerFound, setIsOwnerFound] = useState(false)

    useEffect(() => params.id && loadPet(), [])

    function loadPet() {
        function parseStory(story) {
            return {
                date: dayjs(story.date, 'YYYY-MM-DD'),
                countryCode: story.countryCode,
                city: story.city,
                description: story.description
            }
        }

        setIsLoading(true)
        axios.get('/pets/' + params.id)
            .then(r => {
                setTitle(r.data.title)
                setType(r.data.type)
                setPhoneNumber(r.data.phoneNumber ?? '')
                setBeginStory(parseStory(r.data.beginStory))
                if (r.data.endStory) {
                    setEndStory(parseStory(r.data.endStory))
                    setIsOwnerFound(true)
                }
            })
            .catch(() => setError(''))
            .finally(() => setIsLoading(false))
    }

    function onSubmit(e) {
        e.preventDefault()
        if (!isOwnerFound && !matchIsValidTel(phoneNumber)) {
            setError("Phone number is incorrect")
            return
        }
        let data = new FormData()
        for (let picture of beginStoryPictures)
            data.append("beginStoryPictures", picture)
        for (let picture of endStoryPictures)
            data.append("endStoryPictures", picture)
        let petEndInfo = isOwnerFound ? {endStory: endStory} : {phoneNumber: phoneNumber}
        setIsLoading(true)
        data.append('pet', new Blob([JSON.stringify({
            title: title,
            type: type,
            beginStory: beginStory,
            ...petEndInfo
        })], {type: "application/json"}))
        axios({
            method: params.id ? 'patch' : 'post',
            url: params.id ? `/pets/${params.id}` : '/pets',
            data: data
        })
            .then(() => navigate('/'))
            .catch(() => setError("Could not save this pet"))
            .finally(() => setIsLoading(false))
    }

    return (
        <Stack component="form" gap={2} sx={{width: '100%'}} onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                    <TextField fullWidth variant='standard' label="Title" autoComplete='off'
                               inputProps={{required: true, maxLength: 100}}
                               value={title} onChange={e => setTitle(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select inputProps={{required: true}} label='Type' value={type} onChange={e => setType(e.target.value)}>
                            <MenuItem value={'CAT'}>Cat</MenuItem>
                            <MenuItem value={'DOG'}>Dog</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Story setError={setError} story={beginStory} setStory={setBeginStory} pictures={beginStoryPictures} setPictures={setBeginStoryPictures} />
            <Paper elevation={4}>
                <Stack sx={{p: 2}} gap={2}>
                    <FormControl>
                        <FormLabel>Owner is</FormLabel>
                        <RadioGroup row value={isOwnerFound ? "true" : "false"}
                                    onChange={e => setIsOwnerFound(e.target.value === 'true')}>
                            <FormControlLabel value="false" control={<Radio />} label="not found" />
                            <FormControlLabel value="true" control={<Radio />} label="found" />
                        </RadioGroup>
                    </FormControl>
                    {
                        isOwnerFound ? (
                            <Story setError={setError} story={endStory} setStory={setEndStory} pictures={endStoryPictures} setPictures={setEndStoryPictures} />
                        ) : (
                            <MuiTelInput defaultCountry="UA" label="Phone number"
                                         color={matchIsValidTel(phoneNumber) ? 'success' : 'error'}
                                         value={phoneNumber} onChange={v => setPhoneNumber(v)} />
                        )
                    }
                </Stack>
            </Paper>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>Save</Button>
        </Stack>
    )
}

export default PetSave
