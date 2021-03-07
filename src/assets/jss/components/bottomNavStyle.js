const bottomNavStyle = theme => ({
    root: {
        bottom: 0,
        backgroundColor: theme.palette.primary.main,
        justifyContent: "space-around",
        position: "fixed",
        width: "100%",
        zIndex: theme.zIndex.drawer + 1
    }
})

export default bottomNavStyle;