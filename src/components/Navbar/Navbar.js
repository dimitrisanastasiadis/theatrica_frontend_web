import React, { useContext, useState } from "react"
import { AppBar, Toolbar, IconButton, InputBase, makeStyles, Button, Hidden } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu";
import style from "../../assets/jss/components/navbarStyle"
import SearchIcon from "@material-ui/icons/Search"
import Brightness3Icon from '@material-ui/icons/Brightness3';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import { DrawerContext } from "../../contexts/DrawerContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import NextNprogress from 'nextjs-progressbar';
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from "next/router"

const useStyles = makeStyles(style)

function Navbar(props){
    const classes = useStyles();
    const { toggleDrawer } = useContext(DrawerContext);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const theme = useTheme();

    const [searchValue, setSearchValue] = useState("");

    const router = useRouter();

    const handleSubmit = event => {
        event.preventDefault()
        if(searchValue)
            router.push(`/results?search_query=${searchValue}`)
    }

    const handleChange = event => {
        setSearchValue(event.target.value)
    }

    return (
        <React.Fragment>
            <AppBar className={classes.appbar} id="navbar">
                <Toolbar className={classes.navbar}>
                    <Hidden xsDown>
                        <IconButton onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <form onSubmit={handleSubmit} className={classes.search}>
                        <InputBase 
                            type="text" 
                            placeholder="Αναζήτηση"
                            value={searchValue}
                            onChange={handleChange}
                            classes={
                                {input: classes.searchInput,
                                 root: classes.searchRoot}
                            }/>
                        <Button className={classes.searchIcon} type="submit">
                            <SearchIcon />
                        </Button>
                    </form>
                    <IconButton onClick={toggleDarkMode}>
                        {darkMode ? <BrightnessHighIcon /> : <Brightness3Icon />}
                    </IconButton>
                </Toolbar>    
                <NextNprogress color={theme.palette.secondary.main}/>
            </AppBar>
            <Toolbar />
            
        </React.Fragment>
    )
}

export default Navbar