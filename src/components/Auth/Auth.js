import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar, Paper, Button, Grid, Typography, Container, } from "@mui/material";
import useStyles from "./styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode"
import { signin, signup } from "../../actions/auth";

const initialState = { firstName:'', lastName:'', email: '', password:'', confirmPassword: '' }

const Auth = () => {

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [isSignUp, setisSignUp] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()


  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignUp){
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => { setFormData({...formData, [e.target.name]: e.target.value}) };

  const switchMode = () => {
    setFormData(initialState);
    setisSignUp((previsSignUp) => !previsSignUp);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
   const result = jwt_decode(res?.credential);
    const token = res?.clientId;
    console.log("result from Google success in Auth.js: ", result);
    

    try {
      dispatch({type:"AUTH", data: {result, token}})
      history.push("/fullstack_dreamshare");
    } catch (error) {
        console.log("ERROR",error)
    }
  };
  const onError = (error) => {
    console.log(error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {" "}
          {isSignUp ? "Sign up" : "Sign In"}{" "}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          {/* <GoogleLogin
            //clientId="755725399621-o6dknkn8nvcvck10etlj4mde2n8ahvb0.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.submit}
                color="primary"
                fullwidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                spacing={2}
                //startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onError={onError}
            cookiePolicy="single_host_origin"
            spacing={2}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            spacing={2}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
