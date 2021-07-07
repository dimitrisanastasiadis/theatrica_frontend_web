const showCardStyle = theme => ({
    cardContainer: {
        border: "2px solid transparent",
        borderRadius: "6px",
        "&:hover": {
            borderRadius: "6px",
            border: `2px solid ${theme.palette.secondary.main}`
        }
    },
    card: {
        height: 280,
        width: 150,
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("sm")]: {
            height: 360,
            width: 200
        }
    },
    cardImg: {
        flexGrow: 1,
        maxHeight: "50%",
        [theme.breakpoints.up("sm")]: {
            maxHeight: "70%"
        }
    },
    cardTitle: {
        margin: "auto 0px auto 0px"
    }
})

export default showCardStyle;