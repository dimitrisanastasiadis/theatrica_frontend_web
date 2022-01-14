const venueDetailsStyle = theme => ({
  pageWrapper: {
    marginTop: "unset"
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
  },
  socialContainer: {
    display: "flex",
    flexWrap: "wrap",
    paddingBottom: 20,
    [theme.breakpoints.up("sm")]: {
        padding: 20,
        paddingTop: 0
    }
  },
  social: {
      display: "flex",
      alignItems: "center",
      padding: 15,
      marginRight: "6%"
  },
  socialLogo: {
      marginRight: 13,
      width: 32,
      height: 32
  }
})

export default venueDetailsStyle;