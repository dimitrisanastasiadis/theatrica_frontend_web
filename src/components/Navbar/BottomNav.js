import React from "react";
import { makeStyles, BottomNavigation, BottomNavigationAction, Hidden } from "@material-ui/core";
import style from "../../assets/jss/components/bottomNavStyle";
import Routes from "../../routes";
import { useRouter } from 'next/router'

const useStyles = makeStyles(style);

function BottomNav(props) {
    const classes = useStyles();
    const router = useRouter();

    const handleClick = route => {
        router.push(route);
    }

    return (
        <Hidden smUp>
            <BottomNavigation 
                className={classes.root} 
                showLabels 
                value={router.pathname.split("/").slice(0, 2).join("/")}>
            {Routes.map(route => {
                return (
                    <BottomNavigationAction 
                        classes={{selected: classes.selected, label: classes.label }}
                        label={route.name} 
                        value={route.path}
                        icon={route.icon}
                        key={route.name}
                        onClick={() => handleClick(route.path)}
                    />
                )
            })}
            </BottomNavigation>
        </Hidden>
        
    )
}

export default BottomNav;