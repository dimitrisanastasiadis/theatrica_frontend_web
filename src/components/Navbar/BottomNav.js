import React from "react";
import { makeStyles, BottomNavigation, BottomNavigationAction, Hidden } from "@material-ui/core";
import style from "../../assets/jss/components/bottomNavStyle";
import Routes from "../../routes";
import { Link, useLocation } from "react-router-dom"
import PropTypes from "prop-types"

const useStyles = makeStyles(style);

function BottomNav(props) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <Hidden smUp>
            <BottomNavigation 
                className={classes.root} 
                showLabels 
                value={location.pathname}>
            {Routes.map(route => {
                return (
                    <BottomNavigationAction 
                        classes={{selected: classes.selected }}
                        key={route.name}
                        label={route.name} 
                        value={route.path}
                        icon={route.icon} 
                        component={Link} 
                        to={route.path}/>
                )
            })}
            </BottomNavigation>
        </Hidden>
        
    )
}

BottomNav.propTypes = {
    currentPath: PropTypes.string,
    setPath: PropTypes.func
}

export default BottomNav;