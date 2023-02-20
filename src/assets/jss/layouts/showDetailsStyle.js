const showDetailsStyle = theme => ({
    overview: {
        marginBottom: "6em"
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
        width: "100%",
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
    photoTab: {
        paddingBottom: 20,
        [theme.breakpoints.up("sm")]: {
            padding: "30px 10px"
        }
    },
    photoFlexContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    photograph: {
        position: "relative",
        width: "33%",
        paddingTop: "33%",
        marginBottom: ".5%",
        [theme.breakpoints.up("sm")]: {
            width: "31%",
            paddingTop: "31%",
            marginBottom: "3.5%",
        }
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
    },
    flexChartContainer: {
        display: "flex",
        marginTop: 50,
        marginBottom: 50,
        gap: 80,
        flexWrap: "wrap",
        justifyContent: "center"
    },
    chartContainer: {
        width: "100%",
        height: 430,
        [theme.breakpoints.up(970)]: {
            width: 400
        }
    },
    vivaLogo: {
        color: "white",
        display: "inline-flex",
        marginTop: 5,
        "&:visited": {
            color: "white"
        },
        "&:hover": {
            textDecoration: "underline",
            color: "red"
        }
    }
})

export default showDetailsStyle;