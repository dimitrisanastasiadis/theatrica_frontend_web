import React from "react"
import { AppBar, Toolbar, IconButton, InputBase, makeStyles, Button } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu";
import style from "../../assets/jss/components/navbarStyle"
import SearchIcon from "@material-ui/icons/Search"
import Brightness3Icon from '@material-ui/icons/Brightness3';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import PropTypes from "prop-types";

const useStyles = makeStyles(style)

function Navbar(props){
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar className={classes.appbar}>
                <Toolbar className={classes.navbar}>
                    <IconButton onClick={props.toggleDrawer}>
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
                    <IconButton onClick={props.toggleDarkMode}>
                        {props.darkMode ? <BrightnessHighIcon /> : <Brightness3Icon />}
                    </IconButton>
                </Toolbar>    
            </AppBar>
            <Toolbar />
            
        </React.Fragment>
    )
}

Navbar.propTypes = {
    darkMode: PropTypes.bool,
    toggleDarkMode: PropTypes.func,
    toggleDrawer: PropTypes.func
}

export default Navbar