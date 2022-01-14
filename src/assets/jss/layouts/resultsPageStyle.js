const resultsPageStyle = theme => ({
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