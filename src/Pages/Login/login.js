import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { useCookies } from "react-cookie";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dashboard from "../Dashboard/dashboard";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["name"]);
  const [superAdmin, setSuperAdmin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.user.isSuperadmin);
        setSuperAdmin()
        if (data.access_token) {
          setCookie("auth", data.access_token);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {loggedIn ? (
        <Dashboard />
      ) : (
        <div className={classes.login}>
          <div className={classes.svgImage}>
            <img
              className={classes.image}
              src={process.env.PUBLIC_URL + "/Assets/login_background (2).svg"}
              alt="SVG Logo"
            />
            <img
              className={classes.loginImage}
              src={process.env.PUBLIC_URL + "/Assets/login.svg"}
              alt="Login pic"
            />
          </div>
          <div className={classes.loginForm}>
            <div className={classes.formCentered}>
              <h1 className={classes.loginTitle}>LOG IN</h1>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    type="email"
                    name="email"
                    placeholder={"Enter your email address"}
                    label="Email"
                    variant="outlined"
                    onChange={(event) => setEmail(event.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    type="password"   
                    name="password"
                    placeholder={"Enter your password"}
                    label="Password"
                    variant="outlined"
                    onChange={(event) => setPassword(event.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.buttonColor}
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Log in
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
