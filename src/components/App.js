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
import PaginationPage from "../layouts/PaginationPage";
import Show from "../layouts/Show";
import ArtistDetails from "../layouts/ArtistDetails";
import { SWRConfig } from "swr";
import ShowDetails from "../layouts/ShowDetails";

function App() {
  
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === null ?
    true : localStorage.getItem("darkMode") === "true");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  }

  React.useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode])

  const toggleDrawer = () => {
    setDrawerOpen(prevDrawerOpen => !prevDrawerOpen);
  }

  return (
    <ThemeProvider theme = {darkMode ? DarkTheme : LightTheme}>
      <CssBaseline />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          dedupingInterval: 300000
        }}>
        <Navbar 
          darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleDrawer={toggleDrawer} />
        <BottomNav />
        <div style={{display: "flex"}}>
          <Sidebar drawerOpen={drawerOpen} />
          <Switch>
            <Route path={"/home"} exact>
              <Home drawerOpen={drawerOpen} />
            </Route>
            <Route path="/artists/:id">
              <ArtistDetails />
            </Route>
            <Route path={"/artists"}>
              <PaginationPage path="/artists" fetchURL="/people"/>
            </Route>
            <Route path={"/shows/:id"} exact>
              <ShowDetails />
            </Route>
            <Route path={"/shows"} exact>
              <Show />
            </Route>
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </SWRConfig>
    </ThemeProvider>
  );
}

export default App;
