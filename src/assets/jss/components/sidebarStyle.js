const sidebarStyle = theme => ({
    drawer: {
        width: 55,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: 200,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 55
    },
    drawerPaper: {
        backgroundColor: theme.palette.primary.main,
        border: 0
    },
    item: {
        paddingTop: 17,
        paddingBottom: 17,
        "&:hover > *": {
            color: theme.palette.secondary.main
        }
    },
    selected: {
        "& > *":{
            color: theme.palette.secondary.main
        }
    },
    toolbar: theme.mixins.toolbar,
})

export default sidebarStyle;