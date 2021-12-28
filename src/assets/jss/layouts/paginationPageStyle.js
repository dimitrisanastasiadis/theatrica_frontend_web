const paginationPageStyle = theme => ({
    grid: {
        flexGrow: 1,
        minWidth: 0,
        padding: "8px 0px 76px 0px",
        marginTop: 50,
        [theme.breakpoints.up("sm")]: {
            paddingLeft: 55
        },
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    },
    list: {
        margin: "30px 0px 50px 0px"
    }
})

export default paginationPageStyle;