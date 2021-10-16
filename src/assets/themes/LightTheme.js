import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let LightTheme = createMuiTheme({
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
            default: "#EEEEEE",
            paper: "#DDDDDD",
            paper2: "#CCCCCC"
        },
        primary: {
            main: "#b3e5fc",
            light: "#82b3c9",
            dark: "#e6ffff"
        },
        secondary: {
            light: "#AAFFFF",
            main: "#fd2155",
            dark: "#2ECBC7"
        },
        type: "light"
    },
    typography: {
        h1: {
            fontSize: "2.5em"
        },
        h2: {
            fontSize: "2em"
        },
        h3: {
            fontSize: "1.8em"
        },
        h4: {
            fontSize: "1.5em"
        },
        h5: {
            fontSize: "1.2em"
        },
        h6: {
            fontSize: "1em"
        }
    }
})

LightTheme = responsiveFontSizes(LightTheme);

export default LightTheme;