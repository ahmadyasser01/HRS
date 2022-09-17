import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';

const ListComponent = ({opened,setOpened}) => {
  return (
    <List>
    {['Specialities', 'see Scheduled Appointments'].map((text, index) => (
         <ListItem key={text} disablePadding>
           <ListItemButton onClick={()=>setOpened(index)}>
             <ListItemIcon>
               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
             </ListItemIcon>
             <ListItemText primary={text} />
           </ListItemButton>
         </ListItem>
       ))}
    </List>
  )
}

export default ListComponent
