const artistsListStyle = theme => ({
    container: {
        display: "flex", 
        width: "100%", 
        maxWidth: 1200,
        margin: "0px auto",
        flexWrap: "wrap", 
        justifyContent: "space-around",
        padding: 5,
        "& > *": {
            margin: 10
        }
    }
})

export default artistsListStyle;