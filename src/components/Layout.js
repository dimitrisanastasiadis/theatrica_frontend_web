import { DrawerContextProvider } from "../contexts/DrawerContext"
import { ThemeContextProvider } from "../contexts/ThemeContext"
import { SWRConfig } from "swr"
import CssBaseline from "@material-ui/core/CssBaseline"
import { mainFetcher } from "../utils/AxiosInstances"
import Navbar from "./Navbar/Navbar"
import BottomNav from "./Navbar/BottomNav"
import Sidebar from "./Navbar/Sidebar"
import { makeStyles } from "@material-ui/core"
import style from "../assets/jss/components/layoutStyle"

const useStyles = makeStyles(style);

const Layout = ({ children }) => {
  const classes = useStyles();

  return ( 
    <DrawerContextProvider>
      <ThemeContextProvider>
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
          <Sidebar />
          <main className={classes.main}>
            {children}
          </main>
        </SWRConfig>
      </ThemeContextProvider>
    </DrawerContextProvider>
  );
}
 
export default Layout;