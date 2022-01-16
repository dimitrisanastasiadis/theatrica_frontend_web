import { DrawerContextProvider } from "../contexts/DrawerContext"
import { SWRConfig } from "swr"
import CssBaseline from "@material-ui/core/CssBaseline"
import { mainFetcher } from "../utils/AxiosInstances"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Navbar/Sidebar"

const Layout = ({ children }) => {

  return ( 
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
          <Sidebar />
          <main>
            {children}
          </main>
        </SWRConfig>
    </DrawerContextProvider>
  );
}
 
export default Layout;