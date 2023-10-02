import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
 
export default function NavBar({path = "/"}) {
    const navigate = useNavigate()
    console.log({path})

    const handleLogout=()=>{
        window.sessionStorage.removeItem("token");
        navigate("../login",{replace:true})

    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
           Fluid Labs Assignment
          </Typography>
          <div>
          {path==="/" && <Link to="/payment" style={{color:"white",marginRight:"20px",fontSize:"16px"}}> Payment Page</ Link>}
          {path!=="/" && <Link to="/listitems"  style={{color:"white",marginRight:"20px",fontSize:"16px"}}> Home</ Link>}

          <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
