import React, { useCallback, useState, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import DarkTheme from '../assets/themes/DarkTheme'
import LightTheme from '../assets/themes/LightTheme'
import CssBaseline from "@material-ui/core/CssBaseline"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Navbar/Sidebar";
import BottomNav from "./Navbar/BottomNav";
import Home from "../layouts/Home";
import Artist from "../layouts/Artist";
import Show from "../layouts/Show";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(useLocation().pathname)

  const checkIfHome = useCallback(() => {
    if (currentPath === '/'){
      setCurrentPath('/home');
    }
  }, [currentPath])

  useEffect(() => {
    checkIfHome()
    
  }, [checkIfHome])

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

  const toggleDrawer = () => {
    setDrawerOpen(prevDrawerOpen => !prevDrawerOpen)
  }

  const handlePath = (newPath) => {
    setCurrentPath(newPath);
  }

  

  return (
    <ThemeProvider theme = {darkMode ? DarkTheme : LightTheme}>
      <CssBaseline />
      <Navbar 
        darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleDrawer={toggleDrawer} />
      <BottomNav currentPath={currentPath} setPath={handlePath}/>
      <div style={{display: "flex"}}>
        <Sidebar drawerOpen={drawerOpen} currentPath={currentPath} setPath={handlePath}/>
        <Switch>
          <Route path={"/home"} exact>
            <Home drawerOpen={drawerOpen} />
          </Route>
          <Route path={"/artist"} exact>
            <Artist />
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
