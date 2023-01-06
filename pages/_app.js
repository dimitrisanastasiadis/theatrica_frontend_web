
import Layout from "../src/components/Layout"
import "../src/assets/css/global.css"
import { ThemeContextProvider } from "../src/contexts/ThemeContext"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContextProvider>
  )
}

export default MyApp
