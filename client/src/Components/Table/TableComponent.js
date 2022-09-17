import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(doc) {
  return {...doc, updateButton:()=>(<Button>Update</Button>) , deleteButton:()=>(<Button>Delete</Button>)};
}
function cleanData(data){
     data.forEach(function(item){
        delete item._id;
        delete item.__v;
    })
    return data;
}

const TableComponent = ({headers,data}) => {
  let clean = structuredClone(data);
    clean = cleanData(clean);
  const rows = clean.map(e => (createData(e)))
  
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
          {Object.keys(row).map(item=>{	
            if(typeof(row[item])==='function')
            return (<TableCell align="center">{(row[item])()}</TableCell>)
            else 
            return  (<TableCell align="center">{row[item]}</TableCell>)

          })}
          
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default TableComponent
