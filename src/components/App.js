import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../routes"
import { ThemeProvider } from '@material-ui/core/styles';
import DarkTheme from '../assets/themes/DarkTheme'
import LightTheme from '../assets/themes/LightTheme'
import CssBaseline from "@material-ui/core/CssBaseline"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Navbar/Sidebar";
import BottomNav from "./Navbar/BottomNav"

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = darkMode ? DarkTheme : LightTheme

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

  const toggleDrawer = () => {
    setDrawerOpen(prevDrawerOpen => !prevDrawerOpen)
  }

  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleDrawer={toggleDrawer} />
      <BottomNav />
      <div style={{display: "flex"}}>
        <Sidebar drawerOpen={drawerOpen}/>
        <Switch>
          {routes.map(route => {
            return (
              <Route 
                key={route.name}
                path={route.path}
                exact={route.isExact}
                component={route.component}
              />
            )
          })}
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </ThemeProvider>  
  );
}

export default App;
