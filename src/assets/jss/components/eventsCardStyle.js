const eventsCardStyle = theme => ({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.dark,
    padding: "0px 2px"
  },
  itemPadding: {
    padding: "15px 10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },
  showTitle: {
    fontWeight: 500
  },
  events: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    padding: "20px 10px",
    gap: 10,
    "&>div": {
      width: "33%",
      "&:last-child": {
        textAlign: "end"
      },
      "&:nth-child(2)": {
        textAlign: "center"
      }
    }
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
  duration: {
    display: "flex",
    gap: 5
  }
})

export default eventsCardStyle;