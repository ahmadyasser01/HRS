import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CalenderComponent from '../../Book/CalenderComponent/CalenderComponent';
import TableComponent from '../../Table/TableComponent';
import ItemForm from '../Item/ItemForm';
import axios from 'axios'
const Specialities = () => {
  const [specialities,setSpecialities] = useState([])
  useEffect(()=>{

    axios.get('http://localhost:5000/api/specialities').then(res=>
    setSpecialities(res.data.specialities))
  },[])
  useEffect(()=>{
    console.log(specialities);
  },[specialities])
      
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md" sx={{minHeight:"100vh"}}>
      <Box sx={{   paddingTop:1, }} >
        <div className='parent-admin-dashboard' style={{display:'flex'}}>
       
      <TableComponent headers={['name','details','Update','delete']} data={specialities}/>
      <ItemForm/>


        </div>


      </Box>
    </Container>
  </React.Fragment>
  )
}

export default Specialities
