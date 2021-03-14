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
        primary: {
            main: "#b3e5fc",
            light: "#82b3c9",
            dark: "#e6ffff"
        },
        secondary: {
            main: "#fd2155"
        },
        type: "light"
    }
})

LightTheme = responsiveFontSizes(LightTheme);

export default LightTheme;