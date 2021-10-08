import { createContext, useState, useEffect } from "react";
import DarkTheme from '../assets/themes/DarkTheme'
import LightTheme from '../assets/themes/LightTheme'
import dynamic from 'next/dynamic'

const ThemeProvider = dynamic(
    () => import('@material-ui/core/styles').then((mod) => mod.ThemeProvider),
    { ssr: false }
)

export const ThemeContext = createContext();

export function ThemeContextProvider(props){
    const [darkMode, setDarkMode] = useState();

    const toggleDarkMode = () => {
        setDarkMode(prevDarkMode => !prevDarkMode);
    }

    useEffect(() => {
        if (localStorage.getItem("darkMode") === null) {
            setDarkMode(true)
        }else{
            setDarkMode(localStorage.getItem("darkMode") === "true")
        }
    }, [])

    useEffect(() => {
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