import React from "react"
import Home from "./layouts/Home";
import Artists from "./layouts/Artists";
import Show from "./layouts/Show";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import TheatersIcon from '@material-ui/icons/Theaters';

const routes = [
    {
        path: "/home",
        name: "Home",
        isExact: true,
        component: Home,
        icon: <HomeIcon fontSize="default"/>
    },
    {
        path: "/artists",
        name: "Artists",
        isExact: true,
        component: Artists,
        icon: <PersonIcon fontSize="default"/>
    },
    {
        path: "/show",
        name: "Show",
        isExact: true,
        component: Show,
        icon: <TheatersIcon fontSize="default" />
    }
]

export default routes;

