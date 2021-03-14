const bottomNavStyle = theme => ({
    root: {
        bottom: 0,
        backgroundColor: theme.palette.primary.main,
        justifyContent: "space-around",
        position: "fixed",
        width: "100%",
        zIndex: theme.zIndex.drawer + 1
    },
    selected: {
        "& > *": {
            color: theme.palette.secondary.main
        }
    }
})

export default bottomNavStyle;