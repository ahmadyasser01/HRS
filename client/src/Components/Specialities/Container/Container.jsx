import React, { useState,useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardComponent from '../Card/CardComponent';
import Container from '@mui/material/Container';
import axios from "axios"
const ContainerComponent = () => {
    const [specialities,setSpecialities] = useState([]);
     useEffect(()=>{
        axios.get('http://localhost:5000/api/specialities')
        .then(res=>setSpecialities(res.data.specialities))

        console.log(specialities);
    },[])
  return (
    <Container sx={{ flexGrow: 0,height:'100vh', mt:2}}  maxWidth="md">
        <Grid container spacing={2.5} sx={{justifyContent:'center'}} >
        {specialities.length >0?specialities.map((speciality,index)=>(
            <Grid key={index} item xs={8} md={4}>
            <CardComponent name={speciality.name} details={speciality.details} id={speciality._id}/>
        </Grid>
        )):"Loading..."}
       

        </Grid>
        
    </Container>
  )
}

export default ContainerComponent
