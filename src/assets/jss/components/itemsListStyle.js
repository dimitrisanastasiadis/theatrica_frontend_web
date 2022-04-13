const ItemsListStyle = theme => ({
    container: {
        display: "flex", 
        width: "100%", 
        maxWidth: 1200,
        margin: "0px auto",
        flexWrap: "wrap",
        gap: 20,
        justifyContent: "space-around",
        padding: 5,
        "& > *": {
            [theme.breakpoints.up("sm")]: {
                margin: 10
            },
        }
    },
    isLoading: {
        padding: 200
    }
})

export default ItemsListStyle;