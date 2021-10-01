import React, { useContext } from "react";
import clsx from 'clsx';
import { makeStyles, List, ListItem, ListItemText, ListItemIcon, Drawer, Hidden } from "@material-ui/core";
// import { Link, useLocation } from "react-router-dom";
import Routes from "../../routes";
import style from "../../assets/jss/components/sidebarStyle";
import { DrawerContext } from "../../contexts/DrawerContext";
import { useRouter } from 'next/router';
import Link from "next/link"

const useStyles = makeStyles(style)

function Sidebar(props) {
    const classes = useStyles();
    const { drawerOpen } = useContext(DrawerContext);
    const router = useRouter();

    return (
        <Hidden xsDown>
            <Drawer 
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen
                }) }
                classes={{paper: clsx(classes.drawerPaper, {
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen
                }) }}>
                <div className={classes.toolbar}/>
                <List>
                    {Routes.map(route => {
                        return (
                            <Link href={route.path} key={route.name}>
                                <a className="linksNoDecoration">
                                    <ListItem
                                        className={classes.item}
                                        classes={{selected: classes.selected}}
                                        selected={router.pathname === route.path}
                                        button 
                                        // component={Link}
                                        >
                                        <ListItemIcon>{route.icon}</ListItemIcon>
                                        <ListItemText primary={route.name}/>
                                    </ListItem>
                                </a>
                            </Link>
                        )
                    })}
                </List>
            </Drawer>
        </Hidden>
            
    )
}

export default Sidebar;