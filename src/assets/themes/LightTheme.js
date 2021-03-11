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
        secondary: {
            main: "#00fff5"
        },
        type: "light"
    }
})

LightTheme = responsiveFontSizes(LightTheme);

export default LightTheme;