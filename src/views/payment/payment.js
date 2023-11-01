import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
 
export default function MediaCard() {
  const [qty, setQty] = React.useState(1);

  const URL = `${process.env.REACT_APP_BASE_URL}/make-payment`;

  const handlePayment = async () => {
      const jwtToken = window.sessionStorage.getItem("token");
    const param = {
      qty: qty,
    };

    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${jwtToken}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(param),
    });
     const body = await res.json();
  window.location.href = body.url;
  };
  return (
    <>
       <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: "31vh" }}
             title="green iguana"
          >
            <img  style={{height:"106%"}} src="buy.png"/>
            </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Buy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get Exciting deals, cashbacks on completing payment{" "}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "centerx",
                flexDirection: "column",
              }}
            >
              <Typography
                style={{
                  textAlign: "center",
                  color: "crimson",
                  fontSize: "21px",
                }}
              >
                Amount - 2000 INR
              </Typography>

              <TextField
                type="number"
                min="1"
                max="5"
                InputProps={{ inputProps: { min: 1, max: 10 } }}
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
                style={{ width: "39%", alignSelf: "center" }}
              />
            </div>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <Button
              size="small"
              variant="contained"
              style={{ alignSelf: "center", width: "54%" }}
              onClick={handlePayment}
            >
              Make Payment
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
