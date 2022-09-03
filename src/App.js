import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Container} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { GoogleOAuthProvider } from "@react-oauth/google";


const clientGID = process.env.GOOGLE_CLIENT_ID
const theme = createTheme({

});

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  //console.log("App.js User", user);

  return (
    <GoogleOAuthProvider clientId={clientGID}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Container maxwidth="xl">
            <Navbar />
            <Switch>
              <Route
                path="/fullstack_dreamshare/"
                exact
                component={() => <Redirect to="/fullstack_dreamshare/posts" />}
              />
              <Route
                path="/fullstack_dreamshare/posts"
                exact
                component={Home}
              />
              <Route
                path="/fullstack_dreamshare/posts/search"
                exact
                component={Home}
              />
              <Route
                path="/fullstack_dreamshare/posts/:id"
                component={PostDetails}
              />
              <Route
                path="/fullstack_dreamshare/auth"
                exact
                component={() =>
                  !user ? <Auth /> : <Redirect to="/fullstack_dreamshare/posts" />
                }
              />
            </Switch>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
