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
    buttonPrev: {
        position: "absolute",
        top: "45%"
    },
    buttonNext: {
        position: "absolute",
        top: "45%",
        right: 0
    },
    container: {
        display: "flex",
        flexDirection: "column"
    },
    description: {
        padding: "20px 0px"
    },
    divider: {
        height: 2,
        margin: "40px 0px"
    }
})

export default videoContainerStyle;