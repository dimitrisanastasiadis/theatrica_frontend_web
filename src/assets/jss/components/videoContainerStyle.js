const videoContainerStyle = theme => ({
    aspectRatioSizer: {
        display: "grid",
        "& > *": {
            gridArea: "1 / 1 / 2 / 2"
        },
        position: "relative",
        width: "66%",
        flexShrink: 0,
        [theme.breakpoints.down("md")]: {
            width: "100%"
        },
        float: "left",
        marginRight: 20
    },
    button: {
        position: "absolute",
        top: "45%",
        "&:hover": {
            color: theme.palette.secondary.main
        },
        minWidth: 20
    },
    buttonNext: {
        right: 0
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
        padding: "0px 0px"
    }
})

export default videoContainerStyle;