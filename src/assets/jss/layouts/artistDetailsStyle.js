const artistDetailsStyle = theme => ({
    grid: {
        flexGrow: 1,
        minWidth: 0,
        padding: "8px 0px 76px 0px"
    },
    avatar: {
        width: 150,
        height: 225,
        marginBottom: 10,
        [theme.breakpoints.up("sm")]: {
            width: 200,
            height: 300,
            marginRight: 20,
            marginBottom: 0
        },
    },
    card: {
        padding: 5,
        margin: "0 10px",
        [theme.breakpoints.up("md")]: {
            padding: 10
        }
    },
    container: {
        display: "flex",
        overflowX: "auto",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
            alignItems: "center"
        }
    },
    gridItem: {
        marginBottom: 16,
        padding: "5px 0px"
    },
    categoryTitle: {
        color: theme.palette.secondary.dark
    },
    accordion: {
        backgroundColor: theme.palette.background.paper2
    },
    accordionContainer: {
        marginTop: 10
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
    }
})

export default artistDetailsStyle