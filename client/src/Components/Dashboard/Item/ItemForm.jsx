import React from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material';
import './item.css'
const ItemForm = ({fieldds}) => {
    const fields =['name',"details"];
  return (
    <div className='item-parent'>
      {fields.map((field) =>(
        <TextField 
        autoComplete="off"
        id={field}
        label={field}
        variant="outlined"
       />
      ))}
      <Button variant='contained'>Add</Button>
    </div>
  )
}

export default ItemForm
