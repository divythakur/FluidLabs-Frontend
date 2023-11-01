import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './ContextComp';
import HomeIcon from '@mui/icons-material/Home';
 
export default function NavBar({path = "/"}) {
    const navigate = useNavigate()
    const context = React.useContext(UserContext)
  
    const handleLogout=()=>{
      context.setUserObj(null)
      fetch(`${process.env.REACT_APP_BASE_URL}/logout`,{credentials:"include"}).then((data)=>{
        console.log({data})
      })
        window.sessionStorage.removeItem("token");
        navigate("../login",{replace:true})

    }

  if(!context.userObj)
  {
    return null;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background:"darkslategray"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textAlign:"start"}}>
          Hi.... {context.userObj.name}
          {  "      "}
          <Link to="/onboarding" style={{color:"white",marginRight:"20px",fontSize:"16px"}}> <HomeIcon htmlColor="#a6bb2d" style={{marginBottom:"-7px",fontSize:"35px"}}/></ Link>

          </Typography>
          <div>

            
          {path==="/" && <Link to="/payment" style={{color:"white",marginRight:"20px",fontSize:"16px"}}> Payment Page</ Link>}

          <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
