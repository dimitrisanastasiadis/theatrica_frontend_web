import React from "react";
import clsx from 'clsx';
import { makeStyles, List, ListItem, ListItemText, ListItemIcon, Drawer, Hidden } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import Routes from "../../routes";
import style from "../../assets/jss/components/sidebarStyle";
import PropTypes from "prop-types";

const useStyles = makeStyles(style)

function Sidebar(props) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <Hidden xsDown>
            <Drawer 
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: props.drawerOpen,
                    [classes.drawerClose]: !props.drawerOpen
                }) }
                classes={{paper: clsx(classes.drawerPaper, {
                    [classes.drawerOpen]: props.drawerOpen,
                    [classes.drawerClose]: !props.drawerOpen
                }) }}>
                <div className={classes.toolbar}/>
                <List>
                    {Routes.map(route => {
                        return (
                            <ListItem
                                className={classes.item}
                                classes={{selected: classes.selected}}
                                selected={location.pathname.startsWith(route.path)}
                                button 
                                component={Link} 
                                to={route.path} 
                                key={route.name}>
                                <ListItemIcon>{route.icon}</ListItemIcon>
                                <ListItemText primary={route.name}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
        </Hidden>
            
    )
}

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool
}

export default Sidebar;