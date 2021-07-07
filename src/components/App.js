import React, {useState} from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
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
import { mainFetcher } from "../utils/AxiosInstances";

function App() {
  
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === null ?
    true : localStorage.getItem("darkMode") === "true");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  }

  React.useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode])

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  const toggleDrawer = () => {
    setDrawerOpen(prevDrawerOpen => !prevDrawerOpen);
  }

  return (
    <ThemeProvider theme = {darkMode ? DarkTheme : LightTheme}>
      <CssBaseline />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          dedupingInterval: 300000,
          errorRetryCount: 2,
          fetcher: mainFetcher
        }}>
        <Navbar 
          darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleDrawer={toggleDrawer} />
        <BottomNav />
        <div style={{display: "flex"}}>
          <Sidebar drawerOpen={drawerOpen} />
          <Switch>
            <Route path="/home" exact>
              <Home drawerOpen={drawerOpen} />
            </Route>
            <Route path="/artists/:id" exact>
              <ArtistDetails />
            </Route>
            <Route path="/artists">
              <PaginationPage path="/artists" fetchURL="/people"/>
            </Route>
            <Route path="/shows/:id" exact>
              <ShowDetails />
            </Route>
            <Route path="/shows" exact>
              <PaginationPage path="/shows" fetchURL="/productions" />
            </Route>
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </SWRConfig>
    </ThemeProvider>
  );
}

export default App;
