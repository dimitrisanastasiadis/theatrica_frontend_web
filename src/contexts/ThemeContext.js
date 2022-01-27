import { createContext, useState, useEffect  } from "react";
import DarkTheme from '../assets/themes/DarkTheme'
import dynamic from 'next/dynamic'

const ThemeProvider = dynamic(
    () => import('@material-ui/core/styles').then((mod) => mod.ThemeProvider),
    { ssr: false }
)

export const ThemeContext = createContext();

export function ThemeContextProvider(props){
    const [secondaryColor, setSecondaryColor] = useState();

    useEffect(() => {
        if (localStorage.getItem("secondaryColor") !== null) {
            const color = JSON.parse(localStorage.getItem("secondaryColor"))
            setSecondaryColor(color)
        }
    }, [])

    useEffect(() => {
        if(secondaryColor){
            localStorage.setItem("secondaryColor", JSON.stringify(secondaryColor));
        }
    }, [secondaryColor])

    const context = { secondaryColor, setSecondaryColor }

    return (
        <ThemeProvider theme={DarkTheme(secondaryColor)}>
            <ThemeContext.Provider value={context}>
                {props.children}
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}