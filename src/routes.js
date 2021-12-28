import React from "react"
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import {FaTheaterMasks} from 'react-icons/fa'
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { FaMapMarkedAlt } from "react-icons/fa"

const routes = [
    {
        path: "/",
        name: "Αρχική",
        icon: <HomeIcon fontSize="default"/>
    },
    {
        path: "/artists",
        name: "Καλλιτέχνες",
        icon: <PersonIcon fontSize="default"/>
    },
    {
        path: "/shows",
        name: "Παραστάσεις",
        icon: <FaTheaterMasks fontSize={24} />
    },
    {
        path: "/venues",
        name: "Θέατρα",
        icon: <LocationCityIcon fontSize="default" />
    },
    {
        path: "/find",
        name: "Βρες",
        icon: <FaMapMarkedAlt fontSize={24} />
    }
]

export default routes;

