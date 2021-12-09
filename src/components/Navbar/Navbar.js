import React, { useContext } from "react"
import { AppBar, Toolbar, IconButton, InputBase, makeStyles, Button } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu";
import style from "../../assets/jss/components/navbarStyle"
import SearchIcon from "@material-ui/icons/Search"
import Brightness3Icon from '@material-ui/icons/Brightness3';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import { DrawerContext } from "../../contexts/DrawerContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import NextNprogress from 'nextjs-progressbar';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(style)

function Navbar(props){
    const classes = useStyles();
    const { toggleDrawer } = useContext(DrawerContext);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const theme = useTheme();

    return (
        <React.Fragment>
            <AppBar className={classes.appbar}>
                <Toolbar className={classes.navbar}>
                    <IconButton onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.search}>
                        <InputBase 
                            type="text" 
                            placeholder="Search" 
                            classes={
                                {input: classes.searchInput,
                                 root: classes.searchRoot}
                            }/>
                        <Button className={classes.searchIcon}>
                            <SearchIcon />
                        </Button>
                    </div>
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