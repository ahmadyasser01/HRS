import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import EventDetails from '../Components/Book/Event-Details/EventDetails';
import CalenderComponent from '../Components/Book/CalenderComponent/CalenderComponent';
import moment from "moment"
import { Alert, Button } from '@mui/material';
import axios from 'axios';
import {useSearchParams} from 'react-router-dom'
import { convertTime } from '../utils/convertTime';

const Book = () => {
  const [date, setDate] = React.useState(moment());
  const [searchParams, setSearchParams] = useSearchParams();
  const [speciality, setSpeciality] = useState("");
  const [msg,setMsg] = useState(false);
  useEffect(() =>{
    axios.get(`http://localhost:5000/api/specialities/${searchParams.get('sp')}`).then(res=>setSpeciality(res.data.speciality))
  },[])
  const handleBook = async()=>{
    const dateTime = convertTime(date);
    console.log(dateTime,"this is date time");
   
    axios.post('http://localhost:5000/api/appointments',{
     user:"632853bd9198fa5f1a16654d",
    speciality:searchParams.get('sp'),
    date:dateTime
    }).then(res=>{
      setMsg(res.data.newAppointment.date);
    }).catch((e)=>console.error(e));
  }

  return (
<React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{  height: '100vh', paddingTop:1 }} >
          <div className='parent' style={{display:'flex',flexDirection:"row"}}>
            <EventDetails speciality={speciality.name}/>
            <div className='right'>
            <CalenderComponent past={true } date={date} setDate={setDate}/>
            <Button variant="outlined" sx={{color:"red" ,borderColor:"red"}} onClick={handleBook}>
              Book
          </Button>
          {msg && <Alert severity="success">You successfully booked an appointment at {msg}</Alert>}

            </div>
          </div>


        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Book
