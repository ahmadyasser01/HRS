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
import { Alert } from '@mui/material';



const Specialities = () => {
  const [error,setError] = useState(null);
  const[update,setUpdate] = useState();
  const [name,setName] = useState();
  const [details,setDetails] = useState();
  const handleAdd = ()=>{
    console.log("added");
  }
  const handleUpdate = ()=>{
    console.log("update is done");
  }
  const handleDelete = (idx)=>{
    console.log("delete is done");
    console.log("index ",idx," is deleted");
    axios.delete(`http://localhost:5000/api/specialities/${idx}`).then((res)=>{
      if(res.status === 'success'){
        return 'ok'
      }
    }).then(()=>{
      setSpecialities((prev)=>prev.filter(p=>{
        return (p['_id']!==idx)
      }))
    })

  }
  const [specialities,setSpecialities] = useState([])
  useEffect(()=>{
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
          
          },[])

  // useEffect(()=>{
  //   console.log(specialities);
  // },[specialities])
      
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md" sx={{minHeight:"100vh"}}>
    {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{   paddingTop:1, }} >
        <div className='parent-admin-dashboard' style={{display:'flex'}}>
       
      <TableComponent headers={['name','details','Update','delete']} data={specialities}
        HandleUpdate={handleUpdate} 
        HandleDelete={handleDelete}
        update={update}
        setUpdate={setUpdate}
       />
      <ItemForm
        fields={['name','details']}
        update={update}
        setUpdate={setUpdate}
        name={name}
        setName={setName}
        details={details}
        setDetails={setDetails}
        />


        </div>


      </Box>
    </Container>
  </React.Fragment>
  )
}

export default Specialities
