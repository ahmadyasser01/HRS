import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListComponent from '../Components/Dashboard/ListComponent';
import BookedContainer from '../Components/Dashboard/BookedAppointments/BookedContainer';
import ItemForm from '../Components/Dashboard/Item/ItemForm';
import Specialities from '../Components/Dashboard/Specialities/Specialities';
const drawerWidth = 240;

const Dashboard = () => {
  const [opened,setOpened] = useState(0);
  useEffect(() => {
    console.log(opened);
  },[opened])
  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
      <ListComponent opened={opened} setOpened={setOpened}/>
      </Drawer>
      {opened===0?<Specialities/>:<BookedContainer/>}
      
    </Box>
  )
}

export default Dashboard
