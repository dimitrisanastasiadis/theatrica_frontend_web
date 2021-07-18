import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Navbar/Sidebar";
import BottomNav from "./Navbar/BottomNav";
import Home from "../layouts/Home";
import PaginationPage from "../layouts/PaginationPage";
import ArtistDetails from "../layouts/ArtistDetails";
import { SWRConfig } from "swr";
import ShowDetails from "../layouts/ShowDetails";
import { mainFetcher } from "../utils/AxiosInstances";
import { DrawerContextProvider } from "../contexts/DrawerContext";
import { ThemeContextProvider } from "../contexts/ThemeContext"

function App() {

  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  return (
    <ThemeContextProvider>
      <DrawerContextProvider>
        <CssBaseline />
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            dedupingInterval: 300000,
            errorRetryCount: 2,
            fetcher: mainFetcher
          }}>
          <Navbar />
          <BottomNav />
          <div style={{display: "flex"}}>
            <Sidebar />
            <Switch>
              <Route path="/home" exact>
                <Home />
              </Route>
              <Route path="/artists/:id" exact>
                <ArtistDetails />
              </Route>
              <Route path="/artists" exact>
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
      </DrawerContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
