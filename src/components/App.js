import React, {useState} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import DarkTheme from '../assets/themes/DarkTheme'
import LightTheme from '../assets/themes/LightTheme'
import CssBaseline from "@material-ui/core/CssBaseline"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Navbar/Sidebar";
import BottomNav from "./Navbar/BottomNav";
import Home from "../layouts/Home";
import Artists from "../layouts/Artists";
import Show from "../layouts/Show";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

  const toggleDrawer = () => {
    setDrawerOpen(prevDrawerOpen => !prevDrawerOpen)
  }

  return (
    <ThemeProvider theme = {darkMode ? DarkTheme : LightTheme}>
      <CssBaseline />
      <Navbar 
        darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleDrawer={toggleDrawer} />
      <BottomNav />
      <div style={{display: "flex"}}>
        <Sidebar drawerOpen={drawerOpen} />
        <Switch>
          <Route path={"/home"} exact>
            <Home drawerOpen={drawerOpen} />
          </Route>
          <Route path={"/artists"}>
            <Artists />
          </Route>
          <Route path={"/show"} exact>
            <Show />
          </Route>
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
