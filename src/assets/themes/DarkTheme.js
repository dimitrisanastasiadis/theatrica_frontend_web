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
            paper: "2A2A2A"
        },
        primary: {
            light: "#303030",
            main: "#1D1D1D",
            dark: "#212121"
        },
        secondary: {
            main: "#71FFFA"
        },
        type: "dark"
    }
})

DarkTheme = responsiveFontSizes(DarkTheme)

export default DarkTheme;