import { Avatar, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyAppointments() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("I AM CALLED");
    setLoading(false);
    fetch(`${process.env.REACT_APP_BASE_URL}/myappointments`, {
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
  }, []);

  return (
    <>
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
          My Apppointments
        </Typography>
        <Button
          style={{ alignSelf: "flex-end", marginRight: "6%" }}
          variant="contained"
          onClick={() => {
            navigate("/specialization");

          }}
        >
          Book Appointment
        </Button>

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
                      Doctor - {each.doctor}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                      Speciallization - {each.specialization}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status - {each.status}
                    </Typography>
                  </div>
                  {
                    <>
                      <Typography style={{ color: "chocolate" }}>
                        {each.status}
                      </Typography>
                    </>
                  }
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
