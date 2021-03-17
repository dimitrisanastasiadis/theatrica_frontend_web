const homeStyle = theme => ({
    grid: {
        flexGrow: 1,
        minWidth: 0,
        padding: "8px 0px 76px 0px"
    },
    gridItem: {
        marginBottom: 16,
        padding: "16px 0px",
        [theme.breakpoints.down("sm")]: {
            backgroundColor: theme.palette.primary.dark
        },
        minHeight: 200
    },
    divider: {
        height: 3,
        margin: "40px 0px"
    },
    loading: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column"
    },
    progressBar: {
        width: "60%"
    }
})

export default homeStyle;