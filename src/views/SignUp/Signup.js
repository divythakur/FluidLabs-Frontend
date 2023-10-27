import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { makeStyles } from "@mui/styles";

const VALID_EMAIL_REGEX =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isValidEmail = (email) => {
  return VALID_EMAIL_REGEX.test(email);
};

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function DoctorDetailsForm() {
  const [userObj, setUserObj] =  React.useState({});
  const navigate = useNavigate();
  const classes = useStyles();
  const [error, setError] =  React.useState({ email: true, password: true });
  const [helperText, setHelpertext] = React.useState({});

  const handleChange = (e) => {
    checkForErrors(e);
    setUserObj((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    const URL = `${process.env.REACT_APP_BASE_URL}/register`;
    e.preventDefault();
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(userObj),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.body == "success") {
          enqueueSnackbar("User registration is successful");
          enqueueSnackbar("Please login with your email ");
          setTimeout(() => {
            navigate("../onboarding", { replace: true });
          }, 2000);
        } else {
          if (data.body === "alreadyExist") {
            enqueueSnackbar("User with this email already Exists !!");
          } else {
            enqueueSnackbar("please provide all the required Info");
          }
        }
      });
  };

  const checkForErrors = (e) => {
    let flag = 0;

    switch (e.target.name) {
      case "email": {
        const validEmail = isValidEmail(e.target.value);
        if (!validEmail) {
          flag = 1;
          setError((prev) => ({ ...prev, email: true }));
          setHelpertext((prev) => ({ ...prev, email: "Give Valid email" }));
        } else {
          const newState = error;
          const clonedtext = helperText;
          if (newState?.email) {
            delete newState.email;
            delete clonedtext.email;
          }
          setError(newState);
          setHelpertext(clonedtext);
        }
        break;
      }
      case "password": {
        if (e.target.value.length < 5) {
          flag = 1;
          setHelpertext((prev) => ({ ...prev, password: "Min length - 5" }));

          setError((prev) => ({ ...prev, password: true }));
          break;
        } else {
          const newState = error;
          const clonedtext = helperText;

          if (newState?.password) {
            delete newState.password;
            delete clonedtext.password;
          }
          setError(newState);
          setHelpertext(clonedtext);
        }
      }
    }
  };

  const handleSubmitGoogle = async (cloud) => {
    const URL = `${process.env.REACT_APP_BASE_URL}/auth/${cloud}`;

    window.location.href = URL;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{background:"bottom"}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
              
            </Avatar>
            <img src = "health.png" alt="logo.svg"  className={classes.logo}/>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
               <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="family-name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                error={userObj.email != undefined && error?.email}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                helperText={helperText.email ?? ""}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={userObj.password != undefined && error?.password}
                helperText={helperText.password ?? ""}
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
             onClick={handleSubmit}
            disabled={Object.keys(error).length || userObj === null}
          >
            Sign Up
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<GoogleIcon />}
            className={classes.button}

            onClick={() => handleSubmitGoogle("google")}
            // disabled={Object.keys(error).length || userObj === null}
          >
            Sign Up with Google
          </Button>

          <Button
            fullWidth
            variant="contained"
            startIcon={<GitHubIcon />}
            sx={{ mt: 3, mb: 2 }}
 
            onClick={() => handleSubmitGoogle("github")}
            // disabled={Object.keys(error).length || userObj === null}
          >
            Sign Up with Github
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

const useStyles = makeStyles({
    button: {
      background: "darkorchid !important",
    },
    logo:{
      height:'10vh',
      width:"12%"
    }
  });
  