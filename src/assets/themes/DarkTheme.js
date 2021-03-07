import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let DarkTheme = createMuiTheme({
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