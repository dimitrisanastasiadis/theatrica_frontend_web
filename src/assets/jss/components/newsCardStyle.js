const NewsCardStyle = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 320,
    backgroundColor: "#2a2a2a",
    borderRadius: "4%",
    overflow: "hidden",
    boxShadow: "0 2px 8px 2px rgba(0, 0, 0, 0.2)",
    border: `2px solid transparent`,
    "&:hover": {
      transform: "translate(0px, -10px)",
      border: `2px solid ${theme.palette.secondary.main}`,
      boxShadow: "0 7px 10px rgba(0, 0, 0, 1)"
    },
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.short,
    }),
  },
  imageWrapper: {
    position: "relative",
    height: 170,
  },
  body: {
    padding: "20px 10px",
    "&>p": {
      marginTop: 5
    }
  }
})

export default NewsCardStyle;