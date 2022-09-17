import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import EventDetails from '../Components/Book/Event-Details/EventDetails';
import CalenderComponent from '../Components/Book/CalenderComponent/CalenderComponent';
import moment from "moment"
import { Button } from '@mui/material';
import axios from 'axios';
import {useSearchParams} from 'react-router-dom'

const Book = () => {
  const [date, setDate] = React.useState(moment());
  const [searchParams, setSearchParams] = useSearchParams();

  const handleBook = async()=>{
    const dateTime = date.toLocaleString('en-US', {
      timeZone: 'Africa/Cairo',
    })
    console.log(dateTime);
    axios.post('http://localhost:5000/api/appointments',{
     user:"6323b54871a78f93e7e760dc",
    speciality:searchParams.get('sp'),
    date
    }).then(res=>{
      window.location.href = "/"
    }).catch((e)=>console.error(e));
  }

  return (
<React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{  height: '100vh', paddingTop:1 }} >
          <div className='parent' style={{display:'flex',flexDirection:"row"}}>
            <EventDetails/>
            <div className='right'>
            <CalenderComponent date={date} setDate={setDate}/>
            <Button variant="outlined" sx={{color:"red" ,borderColor:"red"}} onClick={handleBook}>
              Book
          </Button>
            </div>
          </div>


        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Book
