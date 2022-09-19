import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import HealingIcon from '@mui/icons-material/Healing';
import './card.css'
import { useNavigate } from "react-router-dom";

const CardComponent = ({name,details,id}) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} onClick={()=>{navigate(`/book?sp=${id}`)}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/hospital.png"
          alt="green iguana"
          sx={{objectFit: "contain"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {details}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardComponent
