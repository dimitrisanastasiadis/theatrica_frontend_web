const showCardStyle = theme => ({
    card: {
        height: 280,
        width: 150,
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("sm")]: {
            height: 360,
            width: 200
        },
    },
    cardImg: {
        flexGrow: 1,
        maxHeight: "50%",
        [theme.breakpoints.up("sm")]: {
            maxHeight: "70%"
        }
    },
    cardTitle: {
        margin: "auto 0px auto 0px"
    }
})

export default showCardStyle;