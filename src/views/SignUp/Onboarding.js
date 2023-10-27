import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const patientInfo = [
  {
    name: "pincode",
    id: "pincode",
    label: "Pincode",
  },
];

const doctorInfo = [
  {
    name: "pincode",
    id: "pincode",
    label: "Pincode",
  },

  {
    name: "specialization",
    id: "specialization",
    label: "Specialization",
  },
];
const specializationList = [
  {
    name: "General Medicine",
    value: "generalmedicine",
  },
  {
    name: "Diabetology",
    value: "diabetology",
  },
  {
    name: "Cardiology",
    value: "cardiology",
  },
  {
    name: "Neurology",
    value: "neurology",
  },
];

const AskType = ({ setState }) => {
  const [type, setType] = useState(null);
  const [loading,setLoading] =useState(true);
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    console.log({ type });
    setState({accounttype: type });
  };


useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL}/getuserinfo`,{
      method:"GET",
      credentials:"include"
    }).then((data)=>{
       return data.json()
    }).then((data)=>{
      console.log({data})
      if(data.body)
      {

        if(data.body.accounttype === "doctor")
        {
          navigate("/appointmentrequests")
        }
        else{
          navigate("/myappointments")
        }
      }
      setLoading(false)
    }).catch(()=>{
      setLoading(false)
    })
},[])

if(loading)
{
  return <CircularProgress />
}
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ height: "49vh", width: "50%", background: "#ffffffa8" }}>
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormGroup>
            <Typography variant="h5">You wana signup as:- </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                style={{ marginBottom: "20px", marginTop: "34px" }}
                control={
                  <Radio
                    value="doctor"
                    onChange={() => {
                      setType("doctor");
                    }}
                  />
                }
                label={
                  <>
                    <img
                      src="doctor.png"
                      alt="logo.svg"
                      style={{ height: "73px", marginLeft: "18px" }}
                    />
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Radio
                    value="patient"
                    onChange={() => {
                      setType("patient");
                    }}
                  />
                }
                label={
                  <>
                    <img
                      src="patient.png"
                      alt="logo.svg"
                      style={{ height: "73px", marginLeft: "10px" }}
                    />
                  </>
                }
              />
            </RadioGroup>

            <Button style={{ marginTop: "15px" }} onClick={handleSubmit}>
              Continue
            </Button>
          </FormGroup>
        </div>{" "}
      </div>
    </div>
  );
};

// const doctorInfo
export default function Onboarding() {
  const [finalObj, setFinalObj] = useState({
    type: null,
  });
  useEffect(() => {
    console.log({ finalObj });
  }, [finalObj]);

  if (finalObj.type === null) {
    return <AskType setState={setFinalObj}></AskType>;
  }
  return (
    <DoctorOnboarding
      setState={setFinalObj}
      state={finalObj}
    ></DoctorOnboarding>
  );
}

const DoctorOnboarding = ({ setState, state }) => {
    const navigate = useNavigate()


  const handleSubmit = async (e) => {
    let URL = `${process.env.REACT_APP_BASE_URL}/onboarduser`;

    let result = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      credentials: "include",
      body: JSON.stringify(state),
    });
    result = await result.json()
    console.log({result})
    if(result.body == "done")
    {
        navigate("/specialization")
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ height: "49vh", width: "50%", background: "#ffffffa8" }}>
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            style={{ display: "flex", flexDirection: "column" }}
            autoComplete="off"
          >
            <Typography variant="h5" style={{ marginBottom: "34px" }}>
             Fill up required informaton:-{" "}
            </Typography>
           {state.accounttype==="doctor" &&  <TextField
              id="outlined-select-currency"
              select
              label="Select your specialization"
              onChange={(e) =>
                setState((prev) => {
                  return { ...prev, specialization: e.target.value };
                })
              }
              // placeholder="Enter Zipcode"
              //  helperText="Please select your specialization"
            >
              {specializationList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>}
            <TextField
              id="outlined-controlled"
              label="Pincode"
              placeholder="Enter Zipcode"
              onChange={(e) =>
                setState((prev) => {
                  return { ...prev, pincode: e.target.value };
                })
              }
            />
            <Button style={{ marginTop: "23px" }} onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </div>{" "}
      </div>
    </div>
  );
};
