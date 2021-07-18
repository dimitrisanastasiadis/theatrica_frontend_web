import React, { createContext, useState } from "react";

export const DrawerContext = createContext();

export function DrawerContextProvider(props){
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(prevDrawerOpen => !prevDrawerOpen);
    }

    const context = {drawerOpen, toggleDrawer};

    return (
        <DrawerContext.Provider value={context}>
            {props.children}
        </DrawerContext.Provider>
    )
}
