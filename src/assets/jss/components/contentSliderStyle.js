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
        padding: "0px 16px",
    },
    swiper: {
        marginTop: 20
    }
})

export default contentSliderStyle;