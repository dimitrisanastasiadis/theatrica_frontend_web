const paginationPageStyle = theme => ({
    grid: {
        flexGrow: 1,
        minWidth: 0,
        padding: "8px 0px 76px 0px",
        marginTop: 20,
        [theme.breakpoints.up("sm")]: {
            paddingLeft: 65,
            marginTop: 40
        },
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    },
    list: {
        margin: "30px 0px 50px 0px"
    },
    headingContainer: {
        maxWidth: 1200,
        margin: "0px auto",
        paddingLeft: 10
    }
})

export default paginationPageStyle;