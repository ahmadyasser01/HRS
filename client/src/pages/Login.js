import { Box, Button, Grid } from '@mui/material'
import React, { useContext, useState } from 'react'
import CreateAccount from '../Components/Login/CreateAccount';
import SignIn from '../Components/Login/SignIn';

// import AuthContext from '../Context/AuthContext'
// import  { ReactComponent as Auth } from '../assets/auth.svg'
const Login = () => {
  // const {user,setUser} = useContext(AuthContext)
  const [signUp,setSignUp] = useState(true);
  return (
    <div className="login">  
        <div className="login-left">
        </div>
        <div className="login-right">
        
        <div className="login-container">
        { signUp?<CreateAccount/>:<SignIn/>}
        </div>
        <h3>Have An account?
        <Button 
        variant="text" disableElevation disableRipple 
        sx={{textTransform: 'none'}}
        onClick={(e)=>{setSignUp(!signUp)}}
        >
        Signin instead
        </Button></h3>
        </div>

       

  
        
    </div>
  )
}

export default Login
