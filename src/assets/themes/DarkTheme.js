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
            default: "#181818"
        },
        primary: {
            light: "#303030",
            main: "#202020",
            dark: "#121212"
        },
        secondary: {
            main: "#00fff5"
        },
        type: "dark"
    }
})

DarkTheme = responsiveFontSizes(DarkTheme)

export default DarkTheme;