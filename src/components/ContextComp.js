import { CircularProgress } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

export default function ContextComp({ children }) {
  const [userObj, setUserObj] = useState({});
  const [loading,setLoading] =useState(true)
  console.log({ children });
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/fetchUserDetails`,{
      credentials:"include"
    })
      .then((d) => {
        return d.json();
      })
      .then((data) => {
        setUserObj( data );
        setLoading(false)
      }).catch(()=>{
        setLoading(false)
      });

  },[])

 if(loading)
 {
  return <CircularProgress />
 }

  return <UserContext.Provider value= {userObj}>{children}</UserContext.Provider>;
}
