import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { UserContext } from "../../components/ContextComp";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function ListOfDoctors() {
  const userContext = useContext(UserContext);
   const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate()

  console.log(window.location.search);
  const searchParams = new URLSearchParams(window.location.search);
  const specialization = searchParams.get("specialization");

  useEffect(() => {
    setLoading(false);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/listdoctors?specialization=${specialization}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setDoctors(data.body);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const bookAppointment = (each) => {
    console.log({ each });
    const url = `${process.env.REACT_APP_BASE_URL}/bookappointment`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
      body: JSON.stringify({
        docId: each.id,
      }),
    }).then(() => {
      enqueueSnackbar("Your appointment was requested succesfully!!");
      setTimeout(() => {
        navigate("/myappointments");
      }, 2000);
    });
  };

  console.log({ doctors });
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
         Available Doctors
        </Typography>

        <div
          style={{
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            width: "45%",
          }}
        >
          {doctors?.map((each) => {
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
                      Specialization - {each.specialization}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fees - {each.fees}
                    </Typography>
                  </div>
                  <Button
                    onClick={() => {
                      bookAppointment(each);
                    }}
                    style={{ height: "40px" }}
                    variant="contained"
                  >
                    {" "}
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
