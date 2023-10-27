import { Avatar, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoneAllIcon from '@mui/icons-material/DoneAll';
export default function AppointmentRequest() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);



  const initiallize=()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/appointmentrequests`, {
      method: "GET",
      credentials: "include",
    })
      .then((data) => {
        console.log({ data });
        return data.json();
      })
      .then((data) => {
        setData(data.body);
        // setDoctors(data.body);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

  }

  useEffect(() => {
    console.log("I AM CALLED");
    setLoading(false);
    initiallize()
 
  }, []);

  const updateStatus=(each,status)=>{
     fetch(`${process.env.REACT_APP_BASE_URL}/modifystatus`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        
       },
      credentials: "include",
      body:JSON.stringify({
        id:each._id,
        status:status
      })
    })
      .then((data) => {
        console.log({ data });
        initiallize()

        return data.json();
      })
      
      .catch(() => {
        setLoading(false);
      });
    


  }

  return  <>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginTop: "6%",
    }}
  >
    <Typography gutterBottom variant="h4">
       Apppointment Requests
    </Typography>

    <div
      style={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        width: "45%",
      }}
    >
      {data?.map((each) => {
        return (
          <Card
            sx={{
              minWidth: "65%",
              backgroundColor: "unset",
              borderRadius: "20px",
              border: "2px solid",
              margin: "15px",
            }}
            style={{ backgroundColor: "none" }}
          >
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-around",
                background: "#fff8dcdb",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="doctor.png"
                sx={{ width: 56, height: 56 }}
              />
              <div>
                <Typography gutterBottom variant="h5">
                  {each.name}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  Requested By - {each.requestedby}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status - {each.status}
                </Typography>
              </div>
             {each.status === "Pending" && <><Button onClick={()=>{updateStatus(each,"Accepted")}} style={{ height: "40px",background:"#008000a8" }} variant="contained">
                {" "}
                Accept
              </Button>
              <Button onClick={()=>{updateStatus(each,"Declined")}} style={{ height: "40px",background:"#ea0a0ac9" }} variant="contained">
                {" "}
                Decline
              </Button></>}
              {each.status !== "Pending" && 
              <>
              <DoneAllIcon  htmlColor="green"/>

              </>}
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
</>;
}
