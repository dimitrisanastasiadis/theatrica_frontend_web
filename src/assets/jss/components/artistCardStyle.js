const artistCardStyle = theme => ({
    avatar: {
        width: 150,
        height: 150,
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
            width: 200,
            height: 200
        },
        marginTop: 10,
        border: "2px solid transparent"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
    },
    subtitle: {
        flexShrink: 0,
        fontWeight: 400,
        opacity: 0.5
    }
})

export default artistCardStyle;