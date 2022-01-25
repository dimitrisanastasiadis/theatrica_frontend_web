const comparePageStyle = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "40px 0",
    gap: 20
  },
  pickersContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 40
  },
  button: {
    padding: "12px 20px",
    borderRadius: 12,
    textTransform: "none",
    alignSelf: "flex-start"
  },
  graphContainer: {
    width: "100%",
    margin: "4em 0",
    display: "flex", 
    flexDirection: "column",
    gap: 30
  }
})

export default comparePageStyle;