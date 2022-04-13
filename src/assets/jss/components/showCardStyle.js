const showCardStyle = theme => ({
    cardContainer: {
        margin: "12px 0 15px",
        border: "2px solid transparent",
        "&:hover": {
            transform: "translate(0px, -10px)",
            borderRadius: "9px",
            border: `2px solid ${theme.palette.secondary.main}`,
            boxShadow: "0 7px 10px rgba(0, 0, 0, 1)"
        },
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.short,
        }),
    },
    card: {
        height: 320,
        width: 160,
        display: "flex",
        flexDirection: "column",
        borderRadius: "9px",
        [theme.breakpoints.up("sm")]: {
            height: 320,
            width: 180
        }
    },
    cardImg: {
        position: "relative",
        width: "100%",
        height: "70%",
        maxHeight: "70%"
    },
    imageContainer: {
        position: "relative",
        height: "100%"
    },
    cardTitle: {
        padding: "9px 9px 7px 7px",
        height: "30%",
        maxHeight: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:last-child": {
            paddingBottom: 7
        },
        overflow: "hidden"
    },
    icons: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0 9px 7px 7px",
        marginTop: "auto"
    },
    link: {
        textDecoration: "none",
        color: "inherit",
        "&:hover": {
            textDecoration: "underline"
        },
        "&:active": {
            color: theme.palette.secondary.light
        }
    },
    button: {
        "&:hover": {
            background: "none"
        }
    }
})

export default showCardStyle;