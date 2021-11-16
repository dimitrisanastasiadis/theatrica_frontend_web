const venueDetailsStyle = theme => ({
  pageWrapper: {
    [theme.breakpoints.up("sm")]:{
        marginLeft: 55,
    },
    minHeight: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column"
  },
  imageGridWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    zIndex: -1,
    "&::after": {
      content: "''",
      position: "absolute",
      backgroundImage: `linear-gradient(180deg,rgba(16,16,18,0) 30%,${theme.palette.background.default} 70%)`,
      top: 0,
      left: 0,
      height: 575,
      width: "100%",
      zIndex: 2
    }
  },
  imageGrid: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "repeat(3,minmax(575px,800px))",
    pointerEvents: "none"
  },
  imageBlur: {
    opacity: 0.5,
    filter: "blur(1.5px)"
  },
  content: {
    maxWidth: 960,
    margin: "0 auto", 
    width: "100%",
    padding: 10,
    "& section": {
      marginBottom: "6em"
    }
  },
  sectionTitle: {
    position: "relative",
    paddingLeft: "0.55em",
    marginBottom: "1.5em",
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
  paragraph: {
    marginBottom: "1em"
  }
})

export default venueDetailsStyle;