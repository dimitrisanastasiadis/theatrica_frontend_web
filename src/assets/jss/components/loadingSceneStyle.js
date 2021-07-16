const loadingSceneStyle = theme => ({
    loading: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    progressBar: {
        width: "60%"
    },
    title: {
        padding: 16,
        marginBottom: "3%"
    },
    fullScreen: {
        height: "calc(100vh - 64px)",
        width: "100%"
    }
})

export default loadingSceneStyle;