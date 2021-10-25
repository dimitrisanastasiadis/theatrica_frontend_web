const videoContainerStyle = theme => ({
    button: {
        position: "absolute",
        top: "45%",
        "&:hover": {
            color: theme.palette.secondary.main
        },
        minWidth: 20,
        color: "white"
    },
    buttonNext: {
        right: 0
    },
    buttonPrev: {
        left: 0
    },
    container: {
        [theme.breakpoints.up("md")]:{
            display: "flex"
        }
    },
    description: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        backgroundColor: theme.palette.primary.dark,
        [theme.breakpoints.up("md")]:{
            maxWidth: "33.3%"
        },
        "& h2": {
            marginBottom: "10px",
            padding: 2
        }
    },
    headerContainer: {
        marginBottom: 24,
        padding: "0px 16px"
    },
    bodyContainer: {
        padding: "0px 0px",
        position: "relative",
        height: "100%",
        [theme.breakpoints.up("md")]:{
            width: "66.6%"
        }
    },
    descriptionHidden: {
        overflow: "hidden",
        maxHeight: "170px",
        position: "relative",
        "&:after": {
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "100%",
            width: "100%",
            content: "''",
            background: `linear-gradient(
                transparent 40%, 
                ${theme.palette.primary.dark} 95%
            )`,
            pointerEvents: "none"
        }
    },
    expandButton: {
        margin: "0 auto",
        padding: 8,
        marginTop: 16,
        "&:hover": {
            color: theme.palette.secondary.main
        }
    },
    collapseButton: {
        transform: "rotate(180deg)"
    }
})

export default videoContainerStyle;