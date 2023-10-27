import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ResponsiveAppBar from "../../components/Navbar";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const speciallisations = [
  {
    name: "General Medicine",
    image: "generalMedicine.jpeg",
    key: "generalmedicine",
  },
  {
    name: "Diabetology",
    image: "Diabetology.png",
    key: "diabetology",
  },
  {
    name: "Cardiology",
    image: "cardiology.png",
    key: "cardiology",
  },
  {
    name: "Neurology",
    image: "Neurology.jpeg",
    key: "neurology",
  },
];

export default function Specialization() {

  const navigate =useNavigate()
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}
      >
        <Typography variant="h3">By Specialization</Typography>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {speciallisations.map((each) => {
          return (
            <Card
              onClick={() => {
                navigate({
                  pathname: "/doctorslist",
                  search: `?specialization=${each.key}`,
                });
              }}
              sx={{ maxWidth: 318 }}
              style={{
                margin: "64px",
                border: "6px solid grey",
                borderRadius: "15px",
                boxShadow: "10px 10px gainsboro",
                cursor:"pointer"
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={each.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {each.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
