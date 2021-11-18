import React from "react"
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import {FaTheaterMasks} from 'react-icons/fa'
import LocationCityIcon from '@material-ui/icons/LocationCity';

const routes = [
    {
        path: "/",
        name: "Home",
        icon: <HomeIcon fontSize="default"/>
    },
    {
        path: "/artists",
        name: "Artists",
        icon: <PersonIcon fontSize="default"/>
    },
    {
        path: "/shows",
        name: "Shows",
        icon: <FaTheaterMasks fontSize={24} />
    },
    {
        path: "/venues",
        name: "Venues",
        icon: <LocationCityIcon fontSize="default" />
    }
]

export default routes;

