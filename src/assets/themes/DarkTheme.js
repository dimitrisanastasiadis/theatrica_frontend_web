import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let DarkTheme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            sd: 800,
            md: 960,
            lg: 1280,
            xl: 1920,
            xxl: 2500
        }
    },
    palette: {
        background: {
            default: "#191919",
            paper: "#2A2A2A",
            paper2: "#373737"
        },
        primary: {
            light: "#303030",
            main: "#1D1D1D",
            dark: "#212121"
        },
        secondary: {
            light: "#AAFFFF",
            main: "#71FFFA",
            dark: "#2ECBC7"
        },
        type: "dark"
    }
})

DarkTheme = responsiveFontSizes(DarkTheme)

export default DarkTheme;