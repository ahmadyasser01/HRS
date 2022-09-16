import React from 'react'
import './calender.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import moment from "moment"
import Button from "@mui/material/Button"

const CalenderComponent = () => {
    const [value, setValue] = React.useState(moment());
    return (
    <div className='right'>
      <LocalizationProvider dateAdapter={AdapterMoment} >
      <DateTimePicker sx={{mt:"5px"}}
        label="Selected Date And Time"
        value={value}
        ampm ={false}
        shouldDisableTime={(timeValue, clockType) => {
            if (clockType === 'hours' && (timeValue<=12 || timeValue>21)) {
              return true;
            }
            if (clockType === 'minutes' && timeValue%30) {
              return true;
            }

            return false;
          }}
        disablePast
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    <Button variant="outlined" sx={{color:"red" ,borderColor:"red"}}>
          Book
          </Button>
    </div>
  )
}

export default CalenderComponent
