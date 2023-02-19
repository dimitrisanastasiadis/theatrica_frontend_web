const loginPageStyle = theme => ({
  outerContainer: {
    minHeight: "calc(100vh - 64px)",
    display: "grid",
  },
  paperContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    gap: 20,
    margin: "auto",
    maxWidth: 380,
    width: "100%"
  },
  errorText: {
    color: "#f44336",
  }
})

export default loginPageStyle;