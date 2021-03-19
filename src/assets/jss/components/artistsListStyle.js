const artistsListStyle = theme => ({
    container: {
        display: "flex", 
        width: "100%", 
        flexWrap: "wrap", 
        justifyContent: "space-around",
        padding: 5,
        "& > *": {
            margin: 10
        }
    }
})

export default artistsListStyle;