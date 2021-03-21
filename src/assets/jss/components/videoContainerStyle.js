const videoContainerStyle = theme => ({
    button: {
        position: "absolute",
        top: "45%",
        "&:hover": {
            color: theme.palette.secondary.main
        },
        minWidth: 20,
    },
    buttonNext: {
        right: "34%",
        [theme.breakpoints.down("md")]: {
            right: 0
        }
    },
    buttonPrev: {
        left: 0
    },
    container: {
        display: "flex",
        flexDirection: "column"
    },
    description: {
        padding: "20px 0px"
    },
    headerContainer: {
        marginBottom: 24,
        padding: "0px 16px"
    },
    bodyContainer: {
        padding: "0px 0px",
        position: "relative"
    }
})

export default videoContainerStyle;