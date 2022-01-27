const homeStyle = theme => ({
    divider: {
        height: 3,
        margin: "50px 0px"
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
    wrapper: {
        marginBottom: 25,
        [theme.breakpoints.up("sm")]: {
            marginLeft: 55
        },
        [theme.breakpoints.up("md")]: {
            marginTop: 35,
            padding: "0 20px"
        }
    },
    container: {
        maxWidth: 1250,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        "& section": {
            backgroundColor: theme.palette.primary.dark,
            margin: "40px 0",
            padding: "30px 0",
            "&:first-child": {
                marginTop: 0,
                padding: 0
            },
            [theme.breakpoints.up("md")]: {
                margin: "25px 0",
                backgroundColor: "unset",
                padding: "0 16px",
            }
        }
    }
})

export default homeStyle;