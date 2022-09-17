import React, { useEffect } from 'react'
import './calender.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"

const CalenderComponent = ({date,setDate}) => {
  useEffect(()=>{
    console.log(date);
  },[date])
    return (
      <LocalizationProvider dateAdapter={AdapterMoment} >
      <DateTimePicker sx={{mt:"5px"}}
        label="Selected Date And Time"
        value={date}
        ampm ={true}
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
          setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
   
  )
}

export default CalenderComponent
