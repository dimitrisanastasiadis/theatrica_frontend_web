import React from "react";
import { makeStyles, BottomNavigation, BottomNavigationAction, Hidden } from "@material-ui/core";
import style from "../../assets/jss/components/bottomNavStyle";
import Routes from "../../routes";
import { Link } from "react-router-dom"

const useStyles = makeStyles(style);

function BottomNav(props) {
    const classes = useStyles();

    return (
        <Hidden smUp>
            <BottomNavigation className={classes.root} showLabels >
            {Routes.map(route => {
                return (
                    <BottomNavigationAction 
                        key={route.name}
                        label={route.name} 
                        icon={route.icon} 
                        component={Link} 
                        to={route.path} />
                )
            })}
            </BottomNavigation>
        </Hidden>
        
    )
}

export default BottomNav;