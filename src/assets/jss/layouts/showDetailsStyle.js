const showDetailsStyle = theme => ({
    pageWrapper: {
        [theme.breakpoints.up("sm")]:{
            marginLeft: 55,
        },
        [theme.breakpoints.up("md")]: {
            marginTop: 35
        },
        minHeight: "calc(100vh - 99px)",
        display: "flex",
        flexDirection: "column"
    },
    overview: {
        marginBottom: "6em",
        maxWidth: 960,
        margin: "0 auto",
        padding: 10,
        width: "100%"
    },
    titleActions: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    actionIcons: {
        display: "flex",
        "&>*": {
            width: 30,
            height: 30,
            margin: "0 10px"
        }
    },
    meta: {
        display: "flex",
        opacity: 0.7,
        marginTop: 2
    },
    mediaContainer: {
        display: "flex", 
        height: "40vw", 
        marginTop: "2em",
        [theme.breakpoints.up("md")]: {
            maxHeight: 360,
        }
    },
    imageNoTrailer: {
        width: "28%", 
        position: "relative"
    },
    imageTrailer: {
        width: "28%", 
        position: "relative", 
        flexShrink: 0,
        marginRight: 20,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    crewContainer: {
        marginTop: "3em",
        display: "inline-flex",
        flexDirection: "column"
    },
    crewCategory: {
        display: "flex", 
        flexWrap: "wrap",
        padding: "1em 0",
        borderBottom: `1px solid ${theme.palette.background.paper2}`,
        "&:last-child": {
            borderBottom: "unset"
        }
    },
    crewCategoryTitle: {
        fontWeight: 700,
        marginRight: "1ch"
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
    detailsBackground: {
        position: "relative",
        backgroundColor: theme.palette.primary.dark,
        flexGrow: 1,
        paddingBottom: 60
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
        padding: "5px 15px",
        borderRadius: 20,
    },
    tabActive: {
        backgroundColor: theme.palette.background.paper2,
        boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.25)"
    },
    tabPanel: {
        padding: "30px 10px"
    },
    titleDecoration: {
        fontWeight: 500,
        position: "relative",
        paddingLeft: "0.55em",
        marginBottom: 25,
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
    table: {
        backgroundColor: "transparent",
        border: `2px solid ${theme.palette.primary.light}`
    },
    tableMargin: {
        marginBottom: 60
    },
    tableRow: {
        "&:last-child th, &:last-child td": {
            borderBottom: 0
        },
    },
    tableCell: {
        borderBottom: `1px solid ${theme.palette.background.paper2}`
    }
})

export default showDetailsStyle;