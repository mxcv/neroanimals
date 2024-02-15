import {Stack, MenuItem, Select, FormControl, InputLabel, TextField, Paper, Typography} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonFileUpload from "./ButtonFileUpload.jsx";
import countries from "../assets/countries.json"

function Story({setError, story, setStory, pictures, setPictures}) {

    function onPicturesUpload(files) {
        if (files.length > 10)
            setError("Max picture count is 10")
        else if (files.some(file => file.size > 10000000))
            setError("Max picture size is 10 MB")
        else if (files.reduce((sum, file) => sum + file.size, 0) > 50000000)
            setError("Max picture size sum is 50 MB")
        else
            setPictures(files)
    }

    return (
        <Stack gap={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Date" value={story.date}
                                onChange={v => (v && v.isValid() && setStory({...story, date: v}))} />
                </DemoContainer>
            </LocalizationProvider>
            <Stack gap={2} direction={{sm: 'row'}}>
                <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select inputProps={{required: true}} label='Country' value={story.countryCode}
                            onChange={e => setStory({...story, countryCode: e.target.value})}>
                        {
                            countries.map(c => (
                                <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <TextField fullWidth label="City" inputProps={{maxLength: 50}}
                           value={story.city === null ? '' : story.city}
                           onChange={e => setStory({...story, city: e.target.value === '' ? null : e.target.value})} />
            </Stack>
            <TextField fullWidth multiline label="Description" inputProps={{maxLength: 3000}}
                       value={story.description === null ? '' : story.description}
                       onChange={e => setStory({...story, description: e.target.value === '' ? null : e.target.value})} />
            <ButtonFileUpload accept={"image/*"} onUpload={onPicturesUpload}>Upload images</ButtonFileUpload>
            {
                pictures.length ? (
                    <Paper sx={{p: 2}} variant='outlined'>
                        {
                            pictures.map((f, i) => (
                                <Typography key={i}>{f.name} ({Math.round(f.size / 1000) / 1000} MB)</Typography>
                            ))
                        }
                    </Paper>
                ) : null
            }
        </Stack>
    )
}

export default Story
