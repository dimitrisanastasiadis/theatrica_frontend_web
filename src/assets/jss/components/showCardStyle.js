const showCardStyle = theme => ({
    cardContainer: {
        margin: "12px 0 15px",
        border: "2px solid transparent",
        borderRadius: "6px",
        "&:hover": {
            transform: "translate(0px, -10px)",
            borderRadius: "6px",
            border: `2px solid ${theme.palette.secondary.main}`,
            boxShadow: "0 7px 10px rgba(0, 0, 0, 1)"
        },
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.short,
        }),
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