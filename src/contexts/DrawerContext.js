import React, { createContext, useState } from "react";

export const DrawerContext = createContext();

export function DrawerContextProvider(props){
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(prevDrawerOpen => !prevDrawerOpen);
    }

    const closeDrawer = () => {
        setDrawerOpen(false);
    }

    const context = {drawerOpen, toggleDrawer, closeDrawer};

    return (
        <DrawerContext.Provider value={context}>
            {props.children}
        </DrawerContext.Provider>
    )
}
