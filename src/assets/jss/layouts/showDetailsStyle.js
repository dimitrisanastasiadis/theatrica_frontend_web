const showDetailsStyle = theme => ({
    pageWrapper: {
        padding: 10
    },
    overview: {
        marginBottom: "4em",
        maxWidth: 960,
        margin: "0 auto"
    },
    detailsBackground: {
        position: "relative",
        backgroundColor: theme.palette.primary.dark,
        margin: "0 -10px",
        [theme.breakpoints.up("md")]: {
            margin: "0 -30px"
        }
    },
    details: {
        maxWidth: 960,
        margin: "0 auto"
    },
    tabsWrapper: {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        bottom: 24
    },
    tabs: {
        backgroundColor: theme.palette.primary.dark,
        borderRadius: 20,
        border: `1.5px solid ${theme.palette.background.paper2}`,
        boxShadow: "0px 4px 7px 0px rgba(0,0,0,0.25)"
    },
    tab: {
        textTransform: "none",
    },
    tabActive: {
        backgroundColor: theme.palette.background.paper2,
        padding: "5px 20px",
        borderRadius: 20,
        boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.25)"
    },


    tabPanel: {
        padding: 10
    },
    appBar: {
        marginBottom: 20
    },
    tableRow: {
        "&:last-child th, &:last-child td": {
            borderBottom: 0
        },
    },
    image: {
        maxWidth: "100%",
        maxHeight: 450
    },
    imageGrid: {
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "center"
        }
    },
    title: {
        [theme.breakpoints.down("sm")]: {
            padding: 16
        }
    }
})

export default showDetailsStyle;