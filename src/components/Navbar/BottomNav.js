import React from "react";
import { makeStyles, BottomNavigation, BottomNavigationAction, Hidden } from "@material-ui/core";
import style from "../../assets/jss/components/bottomNavStyle";
import Routes from "../../routes";
import { Link, useLocation } from "react-router-dom"

const useStyles = makeStyles(style);

function BottomNav(props) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <Hidden smUp>
            <BottomNavigation 
                className={classes.root} 
                showLabels 
                value={`/${location.pathname.split("/")[1]}`}>
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

export default BottomNav;