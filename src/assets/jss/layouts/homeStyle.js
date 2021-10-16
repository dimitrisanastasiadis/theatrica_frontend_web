const homeStyle = theme => ({
    divider: {
        height: 3,
        margin: "70px 0px 40px 0px"
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
    },
    container: {
        maxWidth: 1250,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        "& section": {
            margin: "25px 0"
        }
    }
})

export default homeStyle;