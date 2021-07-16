const showDetailsStyle = theme => ({
    grid: {
        flexGrow: 1,
        minWidth: 0,
        padding: "8px 0px 76px 0px",
        "& > *": {
            marginBottom: 16,
            padding: "5px 0px"
        }
    },
    paper2: {
        backgroundColor: theme.palette.background.paper2
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