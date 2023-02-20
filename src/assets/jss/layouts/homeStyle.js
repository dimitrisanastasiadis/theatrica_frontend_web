const homeStyle = theme => ({
    heroSection: {
        minHeight: `calc(100vh - 64px)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10,
        "&>p": {
            fontSize: "1.3em",
            maxWidth: 600
        },
        padding: "0 20px"
    },
    heroBackgroundWrapper: {
        paddingTop: 64,
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0.7,
    },
    heroBackground: {
        width: "103%",
        height: "100%",
    },
    searchInput: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: 10,
        maxWidth: 182,
        backgroundColor: theme.palette.primary.light,
        borderRadius: 20,
        border: `1px solid ${theme.palette.primary.light}`,
        marginTop: 10,
        boxShadow: "0 2px 8px 2px rgba(0, 0, 0, 0.2)",
    },
    divider: {
        height: 3,
        margin: "50px 0px"
    },
    loading: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column"
    },
    progressBar: {
        width: "60%"
    },
    wrapper: {
        marginBottom: 25,
        [theme.breakpoints.up("sm")]: {
            marginLeft: 55
        },
        [theme.breakpoints.up("md")]: {
            padding: "0 20px"
        }
    },
    container: {
        maxWidth: 1250,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        "& section": {
            backgroundColor: theme.palette.primary.dark,
            margin: "40px 0",
            padding: "30px 0",
            [theme.breakpoints.up("md")]: {
                margin: "25px 0",
                backgroundColor: "unset",
                padding: "0 16px",
            }
        }
    },
    newsContainer: {
        padding: "40px 20px",
        display: "flex",
        flexWrap: "wrap",
        gap: 50,
        justifyContent: "center",
        [theme.breakpoints.up(785)]: {
            justifyContent: "space-around"
        }
    },
    headingPadding: {
        padding: "0 20px",
        [theme.breakpoints.up("md")]: {
            padding: 0
        }
    },
    scrollPromptContainer: {
        marginTop: "auto",
    }
})

export default homeStyle;