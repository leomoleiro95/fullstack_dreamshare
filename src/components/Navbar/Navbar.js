import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  //const decoded = jwt_deocde(user?.result);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  //console.log("User", user?.result.picture);
  //console.log("decoded: ", decoded);

  const logout = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
    history.push("/");

  };

  useEffect(() => {
    //const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit" align="center" >
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center" > DreamShare </Typography>
        {/* <img className={classes.image} src={dreams} alt="dreams" height="50" /> */}
      </div>
      <Toolbar className={classes.toolbar}> {user ? ( <div className={classes.profile}> <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture} >
              {/* {`${user?.result.picture}`} */}
            </Avatar>
            <Typography className={classes.userName} variant="h6"> {user?.result.name} </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} > Logout </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary" > Sign In </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
