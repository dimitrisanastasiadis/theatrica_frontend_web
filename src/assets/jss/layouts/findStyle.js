const findStyle = theme => ({
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
  sliderWrapper: {
    alignSelf: "stretch"
  },
  slider: {
    maxWidth: 420,
    width: "95%"
  },
  sliderLabel: {
    "&>span>span": {
      color: '#000'
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "40px 0 65px 0",
    gap: 70
  },
  radioButtons: {
    marginBottom: 25
  },
  formDates: {
    display: "flex",
    gap: 50,
    alignSelf: "stretch",
    flexWrap: "wrap",
    "& ::-webkit-calendar-picker-indicator" : {
      filter: `invert(${theme.palette.type === "dark" ? 1 : 0})`
    }
  },
  addressWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 25
  },
  button: {
    padding: "12px 20px",
    borderRadius: 12,
    textTransform: "none",
    alignSelf: "flex-start"
  },
  resultsWrapper: {
    margin: "40px 0 65px 0"
  },
  resultsContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
    gap: 60
  }
})

export default findStyle