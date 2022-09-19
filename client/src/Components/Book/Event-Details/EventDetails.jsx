import React from 'react'
import './eventDetails.css'
import Typography from "@mui/material/Typography"
const EventDetails = ({speciality}) => {
  return (
    <div className='left'>
      <Typography variant="h6" component="h2">
        Name
      </Typography>
      <Typography variant="h6" component="h6">
        30 Mins appointment in speciality of {speciality}
      </Typography>
      
    </div>
  )
}

export default EventDetails
