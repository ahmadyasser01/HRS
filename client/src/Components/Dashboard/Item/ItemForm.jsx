import React from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material';
import './item.css'
import CalenderComponent from '../../Book/CalenderComponent/CalenderComponent';
import moment from 'moment';
const ItemForm = ({fields,update, date, setDate,HandleUpdate}) => {

    // const fields =['name',"details"];
  return (
    <div className='item-parent'>
      {fields.map((field) =>{
        if(field=== 'cancel') return (<Button variant='outlined'>Cancel</Button>)
        else if(field ==='date') return (<CalenderComponent date={date} setDate={setDate}/>)
        else return( <TextField 
        autoComplete="off"
        id={field}
        label={field}
        variant="outlined"
       />)
      }
        
      )}
      <Button variant='contained' onClick={HandleUpdate}>{update?"update":"Add"}</Button>
    </div>
  )
}

export default ItemForm
