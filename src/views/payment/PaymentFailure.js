import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
 
const primary = purple[500]; // #f44336

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
       <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: primary,
        }}
      >
        <Typography variant="h1" style={{ color: "white" }}>
          500
        </Typography>
        <Typography variant="h6" style={{ color: "white" }}>
          OOPS, the payment was failed, The amount will be credited back if
          debited in 24 hours.
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate("../onboarding", { replace: true });
          }}
        >
          Back Home
        </Button>
      </Box>
    </>
  );
};
export default Error;
