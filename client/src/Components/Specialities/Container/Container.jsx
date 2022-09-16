import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardComponent from '../Card/CardComponent';
import Container from '@mui/material/Container';
const ContainerComponent = () => {
  return (
    <Container sx={{ flexGrow: 0,height:'100vh', mt:2}}  maxWidth="md">
        <Grid container spacing={2.5} sx={{justifyContent:'center'}} >
        <Grid item xs={8} md={4}>
            <CardComponent/>
        </Grid>
        <Grid item xs={8} md={4}>
            <CardComponent/>
        </Grid>
        <Grid item xs={8} md={4}>
            <CardComponent/>
        </Grid>
        <Grid item xs={8} md={4}>
            <CardComponent/>
        </Grid>
        <Grid item xs={8} md={4}>
            <CardComponent/>
        </Grid>
        <Grid item xs={8} md={4}>
            <CardComponent/>
        </Grid>
        <Grid item xs={8} md={4}>
            <CardComponent/>
        </Grid>
        <Grid item xs={8} md={4}>
            <CardComponent/>
        </Grid>
       

        </Grid>
        
    </Container>
  )
}

export default ContainerComponent
