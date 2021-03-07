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
    headerContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 20
    }
})

export default contentSliderStyle;