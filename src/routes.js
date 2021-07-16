import React from "react"
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import {FaTheaterMasks} from 'react-icons/fa'

const routes = [
    {
        path: "/home",
        name: "Home",
        isExact: true,
        icon: <HomeIcon fontSize="default"/>
    },
    {
        path: "/artists",
        name: "Artists",
        isExact: true,
        icon: <PersonIcon fontSize="default"/>
    },
    {
        path: "/shows",
        name: "Shows",
        isExact: true,
        icon: <FaTheaterMasks fontSize={24} />
    }
]

export default routes;

