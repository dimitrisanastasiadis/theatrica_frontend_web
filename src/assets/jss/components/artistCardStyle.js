const artistCardStyle = theme => ({
    avatar: {
        width: 135,
        height: 135,
        border: `2px solid transparent`,
        "&:hover": {
            transform: "translate(0px, -10px)",
            border: `2px solid ${theme.palette.secondary.main}`,
            boxShadow: "0 7px 10px rgba(0, 0, 0, 1)"
        },
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.short,
        }),
        zIndex: 2,
        [theme.breakpoints.up("sm")]: {
            width: 160,
            height: 160
        },
        marginTop: 10
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: 135,
        padding: 2,
        [theme.breakpoints.up("sm")]: {
            width: 180
        },
    },
    subtitle: {
        flexShrink: 0,
        fontWeight: 400,
        opacity: 0.5
    },
    name: {
        marginTop: 10
    },
    transparent: {
        backgroundColor: "transparent"
    }
})

export default artistCardStyle;