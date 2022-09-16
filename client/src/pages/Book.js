import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider';
import EventDetails from '../Components/Book/Event-Details/EventDetails';
import CalenderComponent from '../Components/Book/CalenderComponent/CalenderComponent';
const Book = () => {
  return (
<React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{  height: '100vh', paddingTop:1 }} >
          <div className='parent' style={{display:'flex'}}>
            <EventDetails/>
            <CalenderComponent/>
          </div>


        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Book
