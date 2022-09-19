import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';



const TableComponent = ({headers,data, HandleUpdate,HandleDelete,update,setUpdate}) => {
  function createData(doc,idx) {
    return {...doc, updateButton:()=>(<Button index={idx} onClick={()=>{setUpdate(true)}}>Update</Button>) , deleteButton:()=>(<Button  id={doc['_id']} onClick={()=>HandleDelete(idx)}>Delete</Button>)};
  }
  function cleanData(data){
       data.forEach(function(item){
          // delete item._id;
          delete item.__v;
      })
      return data;
  }



  let clean = structuredClone(data);
    clean = cleanData(clean);
  const rows = clean.map((e,idx) => (createData(e,e['_id'])))
  
  console.log(data);
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
        {headers.map(item =>(
          <TableCell key={item} align="center">{item}</TableCell>
        ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
          {Object.keys(row).map((item,index)=>{	
            if(typeof(row[item])==='function')
            return (<TableCell key={index}align="center">{(row[item])()}</TableCell>)
            else if(item!=='_id')
            return  (<TableCell key={index } align="center">{row[item]}</TableCell>)

          })}
          
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default TableComponent
