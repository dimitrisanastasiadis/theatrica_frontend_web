import React, { createContext, useState } from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import DarkTheme from '../assets/themes/DarkTheme'
import LightTheme from '../assets/themes/LightTheme'

export const ThemeContext = createContext();

export function ThemeContextProvider(props){
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === null ?
        true : localStorage.getItem("darkMode") === "true");

    const toggleDarkMode = () => {
        setDarkMode(prevDarkMode => !prevDarkMode);
    }

    React.useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode])

    const context = {darkMode, toggleDarkMode}

    return (
        <ThemeProvider theme = {darkMode ? DarkTheme : LightTheme}>
            <ThemeContext.Provider value={context}>
                {props.children}
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}