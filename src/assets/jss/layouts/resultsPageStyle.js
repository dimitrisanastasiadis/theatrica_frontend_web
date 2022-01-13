const resultsPageStyle = theme => ({
  pageWrapper: {
    [theme.breakpoints.up("sm")]:{
        marginLeft: 55,
    },
    [theme.breakpoints.up("md")]: {
        marginTop: 35
    },
    marginTop: 15,
    minHeight: "calc(100vh - 99px)",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    marginBottom: "6em",
    maxWidth: 960,
    margin: "0 auto",
    padding: 10,
    width: "100%"
  },
  title: {
    marginBottom: 40
  },
  hitsContainer: {
    marginBottom: "5em"
  },
  hits: {
    marginTop: 30,
    marginBottom: 20
  },
  tableRow: {
    "&:last-child th, &:last-child td": {
        borderBottom: 0
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
        textDecoration: "underline"
    },
    "&:active": {
        color: theme.palette.secondary.light
    }
  },
  linkMore: {
    textDecoration: "underline",
    color: theme.palette.secondary.main,
    "&:active": {
        color: theme.palette.secondary.dark
    }
  },
  underlineDecoration: {
    position: "relative",
    display: "inline-block",
    "&::after": {
      content: "''",
      position: "absolute",
      left: 0,
      bottom: "-.2em",
      backgroundImage: `linear-gradient(to right, ${theme.palette.secondary.main}, rgba(0,0,0,0))`,
      height: 1,
      width: "100%"
    },
  },
  pagination: {
    display: "flex",
    justifyContent: "center"
  }
})

export default resultsPageStyle;