import { CircularProgress } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const UserContext = createContext();

export default function ContextComp({ children }) {
  const [userObj, setUserObj] = useState(null);
  const [loading,setLoading] =useState(true)
   console.log({ children });
  useEffect(()=>{
   window.location.pathname!=="/signup" &&   fetch(`${process.env.REACT_APP_BASE_URL}/fetchUserDetails`,{
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((d) => {
        return d.json();
      })
      .then((data) => {
        console.log({data})
      
        if(data.body === "unauthorized")
        { 
          console.log("I AM HEREE")
           enqueueSnackbar("You are not authorized to view this page, or session timed out !!!")
            window.location.href = "https://fluidlabfrontend-e1ae64993b8c.herokuapp.com/signup"
        }
        setUserObj( data );

        setLoading(false)

      }).catch((err)=>{
         window.location.href = "https://fluidlabfrontend-e1ae64993b8c.herokuapp.com/signup"
        console.log({err})

        setLoading(false)
      });

      if(window.location.pathname==="/signup")
      {
        setLoading(false)
      }

  },[])

 if(loading)
 {
  return <CircularProgress />
 }

  return <UserContext.Provider value= {{userObj,setUserObj}}>{children}</UserContext.Provider>;
}
