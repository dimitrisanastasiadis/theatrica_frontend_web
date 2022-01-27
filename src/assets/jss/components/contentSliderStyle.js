const contentSliderStyle = theme => ({
    container: {
        display: "flex",
        flexDirection: "column"
    },
    slide: {
        display: "flex",
        justifyContent: "center"
    },
    buttonsContainer: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    },
    button: {
        "&:hover": {
            color: theme.palette.secondary.main
        }
    },
    headerContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        [theme.breakpoints.down("md")]: {
            padding: "0 20px"
        }
    },
    swiper: {
        marginTop: 20
    },
    title: {
        position: "relative",
        paddingLeft: "0.55em",
        "&::before": {
            content: "''",
            position: "absolute",
            width: 5,
            backgroundColor: theme.palette.secondary.main,
            height: "80%",
            marginLeft: "-0.55em",
            top: "0.1em"
        }
    },
})

export default contentSliderStyle;