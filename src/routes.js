import React from "react"
import Home from "./layouts/Home";
import PaginationPage from "./layouts/PaginationPage";
import Show from "./layouts/Show";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import {FaTheaterMasks} from 'react-icons/fa'

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
        component: PaginationPage,
        icon: <PersonIcon fontSize="default"/>
    },
    {
        path: "/shows",
        name: "Shows",
        isExact: true,
        component: Show,
        icon: <FaTheaterMasks fontSize={24} />
    }
]

export default routes;

