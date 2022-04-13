import React from "react"
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import {FaTheaterMasks} from 'react-icons/fa'
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { FaMapMarkedAlt } from "react-icons/fa"
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import PaletteIcon from '@material-ui/icons/Palette';

const routes = [
    {
        path: "/",
        name: "Αρχική",
        icon: <HomeIcon fontSize="default"/>
    },
    {
        path: "/artists",
        pathOnClick: "/artists?page=1",
        name: "Καλλιτέχνες",
        icon: <PersonIcon fontSize="default"/>
    },
    {
        path: "/shows",
        pathOnClick: "/shows?page=1",
        name: "Παραστάσεις",
        icon: <FaTheaterMasks fontSize={24} />
    },
    {
        path: "/venues",
        pathOnClick: "/venues?page=1",
        name: "Θέατρα",
        icon: <LocationCityIcon fontSize="default" />
    },
    {
        path: "/find",
        name: "Βρες",
        icon: <FaMapMarkedAlt fontSize={24} />
    },
    {
        path: "/saved",
        name: "Αποθηκευμένα",
        icon: <BookmarksIcon fontSize="default" />
    },
    {
        path: "/stats",
        pathOnClick: "/stats/2022",
        name: "Στατιστικά",
        icon: <EqualizerIcon fontSize="default" />
    },
    {
        path: "/compare",
        name: "Σύκριση",
        icon: <CompareArrowsIcon fontSize="default" />
    },
    {
        path: "/color",
        name: "Χρώματα",
        icon: <PaletteIcon fontSize="default" />
    }
]

export default routes;

