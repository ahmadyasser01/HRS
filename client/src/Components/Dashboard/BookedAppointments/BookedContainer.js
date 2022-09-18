import React, { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import "./booked.css"
import CalenderComponent from '../../Book/CalenderComponent/CalenderComponent';
import TableComponent from '../../Table/TableComponent';
import ItemForm from '../Item/ItemForm';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';



const BookedContainer = () => {
  const [age, setAge] = React.useState(0);
  const [appointments,setAppointments] = React.useState([])
  useEffect(() =>{
    axios.get('http://localhost:5000/api/appointments/today')
    .then(res=>{
      console.log(res,"res");
      if(res.status ===200)
      setAppointments(res.data.appointments)
      else
      console.log(res.data  );
    })
    .catch(err =>console.log(err));
  },[])
  const handleChange = (event) => {
    setAge(event.target.value);
  };
    const buttons = [
        <Button key="one">Today</Button>,
        <Button key="two">Upcoming</Button>,
        <Button key="three">past</Button>,
        <Button key="three">Date Range</Button>,

      ];
      
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md" sx={{minHeight:"100vh"}}>
      <Box sx={{   paddingTop:1, }} >
        <div className='parent-admin-dashboard' style={{display:'flex'}}>
        <ButtonGroup size="large" aria-label="large button group">
        {buttons}
      </ButtonGroup>
      <TableComponent 
        headers={['Specialitiy','user','date',"cancelled",'Update','cancel']} 
        data={appointments}

        />
        <FormControl fullWidth sx={{marginTop:"1rem"}}>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Specialitiy"
          onChange={handleChange}
          sx={{color: 'red'}}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> 
    <ItemForm fields={['date','cancel']}/> 
        </div>
      </Box>
    </Container>
  </React.Fragment>
  )
}

export default BookedContainer
