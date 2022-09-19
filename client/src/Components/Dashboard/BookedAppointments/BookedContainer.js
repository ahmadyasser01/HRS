import React, { useEffect, useState } from 'react'
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
import moment from 'moment';
import { convertTime } from '../../../utils/convertTime';
import { Stack } from '@mui/system';
import AdminApi from '../../../Api/admin';



const BookedContainer = () => {
  const [dateRange,setDateRange] =useState(false);
  const [start,setStart] = useState();
  const [end,setEnd] = useState();
  const [date, setDate] = React.useState(moment());
  const[specialities,setSpecialities] = useState([])
  const [error,setError] = useState(null);
  const[update,setUpdate] = useState(false);
  const [speciality, setSpeciality] = React.useState(0);
  const [appointments,setAppointments] = React.useState([])
  const handleUpdate = ()=>{
    console.log("update is done");
    const updates = {
      date:convertTime(date),
      speciality
    }
    console.log(updates);
  }
  const handleQuery =(key)=>{
    console.log(key);
    let promise;
    setDateRange(false);
    switch(key){
      case 0:
        promise = AdminApi.getTodayAppointments();
        break;
      case 1:
        promise = AdminApi.getPastAppointments();
        break;
      case 2:
        promise = AdminApi.getupcomingAppointments();
        break;
      case 3:
        setDateRange(true); return;
        promise = AdminApi.getDateRangeAppointments();
        break;  
    }

    promise.then(res=>setAppointments(res['appointments']))

  }
  const getDateRange = async ()=>{
     AdminApi.getDateRangeAppointments(start,end).then(res=>setAppointments(res['appointments']))
  }
  const handleDelete = (idx)=>{
    // console.log("delete is done");
    // console.log("index ",idx," is deleted");
    // axios.delete(`http://localhost:5000/api/specialities/${idx}`).then((res)=>{
    //   if(res.status === 'success'){
    //     return 'ok'
    //   }
    // }).then(()=>{
    //   setSpecialities((prev)=>prev.filter(p=>{
    //     return (p['_id']!==idx)
    //   }))
    // })
    console.log(idx);

  }
  useEffect(() =>{
    axios.get('http://localhost:5000/api/specialities').then(res=>
    {
      if(res.status === 200)
        setSpecialities(res.data.specialities)
      else 
        setError(res.data.error);
    } 
    ).catch(err=>{
      console.log(err.response.data.error);
    })
  },[update])

  useEffect(() =>{
    console.log(update);
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
    setSpeciality(event.target.value);
  };
    const buttons = ['Today',"past","Upcoming","Date Range"];
      
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md" sx={{minHeight:"100vh"}}>
      <Box sx={{   paddingTop:1, }} >
        <div className='parent-admin-dashboard' style={{display:'flex'}}>
        {/* <ButtonGroup size="large" aria-label="large button group" onClick={e=>handleQuery(e)}>
        {buttons}
      </ButtonGroup> */}
      <Stack direction="row" spacing={2}>
      {
        buttons.map((button, index) =>(
          <Button key={button} onClick={e=>handleQuery(index)} >{button}</Button>
        ))
      }
      </Stack>
      {dateRange && <Stack direction="row" spacing={2}>
      <CalenderComponent past={false} date={start} setDate={setStart}/>
      <CalenderComponent date={end} setDate={setEnd}/>
      <Button onClick={()=>getDateRange()}>Get</Button>
      </Stack>}
      <TableComponent 
        headers={['Specialitiy','user','date',"cancelled",'Update','cancel']} 
        data={appointments}
        HandleUpdate={handleUpdate} 
        HandleDelete={handleDelete}
        update={update}
        setUpdate={setUpdate}

        />
        {
          update&&
          <>

        <FormControl fullWidth sx={{marginTop:"1rem"}}>
      <InputLabel id="demo-simple-select-label">speciality</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={speciality}
          label="Specialitiy"
          onChange={handleChange}
          sx={{color: 'red'}}
        >
        {specialities.length > 0 && specialities.map((spec,indx) =>(
          <MenuItem key={indx} value={spec.name}>{spec.name}</MenuItem>

        ))}
        </Select>
      </FormControl> 
    <ItemForm fields={['date','cancel']}
      update={update}
      HandleUpdate={handleUpdate} 
        setUpdate={setUpdate}
        date={date}
        setDate={setDate}
    /> 
          </>
        }
        </div>
      </Box>
    </Container>
  </React.Fragment>
  )
}

export default BookedContainer
