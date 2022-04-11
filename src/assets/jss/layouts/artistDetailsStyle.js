const artistDetailsStyle = theme => ({
    wrapper: {
        [theme.breakpoints.up("md")]: {
            padding: "0 20px"
        }
    },
    container: {
        display: "flex",
        overflowX: "auto",
        flexDirection: "column",
        "& section": {
            marginBottom: "4em"
        }
    },
    overview: {
        display: "grid",
        gridTemplateColumns: "auto 32px",
        gridTemplateRows: "auto auto auto 1fr",
        gridColumnGap: 30,
        gridRowGap: 20,
        [theme.breakpoints.up("sm")]: {
            gridTemplateColumns: "auto auto 32px",
            gridTemplateRows: "auto auto 1fr",
        }
    },
    avatar: {
        width: 150,
        height: 225,
        marginTop: 5,
        gridColumn: "1 / span 2",
        gridRow: 1,
        justifySelf: "center",
        [theme.breakpoints.up("sm")]: {
            width: 200,
            height: 300,
            marginBottom: 0,
            gridColumn: 1,
            gridRow: "1 / span 3",
        },
    },
    name: {
        gridColumn: 1,
        gridRow: 2,
        [theme.breakpoints.up("sm")]: {
            gridColumn: 2,
            gridRow: 1
        }
        
    },
    favoriteIcon: {
        gridColumn: 2,
        gridRow: 2,
        "&:hover": {
            background: "none"
        },
        [theme.breakpoints.up("sm")]: {
            gridColumn: 3,
            gridRow: 1
        }
    },
    bio: {
        gridColumn: "1 / span 2",
        gridRow: 3,
        [theme.breakpoints.up("sm")]: {
            gridColumn: "2 / span 2",
            gridRow: 2
        }
    },
    birthday: {
        gridRow: 4,
        [theme.breakpoints.up("sm")]: {
            gridRow: 3
        }
        
    },
    sectionTitle: {
        fontWeight: 500,
        position: "relative",
        paddingLeft: "0.55em",
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
    photographsContainer: {
        display: "flex",
        width: "100%",
        padding: "20px 0",
        gap: "1%",
        [theme.breakpoints.up("sm")]: {
            gap: "3%"
        }
    },
    photograph: {
        width: 120,
        height: 120,
        position: "relative",
        borderRadius: 13,
        overflow: "hidden",
        margin: "0 5px "
    },
    list: {
        margin: 10,
        border: `2px solid ${theme.palette.primary.light}`,
        "& ListItem": {
            borderBottom: "1px solid #353535"
        }
    },
    listItem: {
        borderBottom: "1px solid #353535",
        "&:last-child": {
            borderBottom: "unset"
        }
    },
    year: {
        marginLeft: "auto",
        flexGrow: 0,
        paddingLeft: 10
    },
    socialContainer: {
        display: "flex",
        flexWrap: "wrap",
        padding: "20px 0",
        [theme.breakpoints.up("sm")]: {
            padding: 20
        }
    },
    social: {
        display: "flex",
        alignItems: "center",
        padding: 15,
        marginRight: "6%"
    },
    socialLogo: {
        marginRight: 13,
        width: 32,
        height: 32
    }
})

export default artistDetailsStyle