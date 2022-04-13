const statsPageStyle = theme => ({
  picker: {
    display: "inline-flex",
    flexDirection: "column",
    gap: 20,
    margin: "20px 0"
  },
  calendarContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: "3em",
    overflowY: "hidden",
    position: "relative",
    [theme.breakpoints.up(1040)]: {
      overflowY: "unset"
    }
  },
  weekdaysLegendContainer: {
    position: "absolute",
    height: 200,
    left: 0,
    fontSize: 12,
    "& span": {
      position: "absolute"
    },
    "& span:nth-child(1)": {
      top: 67
    },
    "& span:nth-child(2)": {
      top: 101
    },
    "& span:nth-child(3)": {
      top: 136
    }
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper2,
    fontSize: 12,
    padding: 5,
    borderRadius: "30"
  },
  flexChartContainer: {
    display: "flex",
    marginTop: 100,
    gap: 80,
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  chartContainer: {
    width: "100%",
    height: 430,
    [theme.breakpoints.up(970)]: {
      width: 400
    }
  },
  loadingContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    "& li": {
      marginBottom: 10
    },
    paddingLeft: 30,
  },
  listHidden: {
    overflow: "hidden",
    maxHeight: 300,
    position: "relative",
    "&:after": {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: "100%",
      width: "100%",
      content: "''",
      background: `linear-gradient(
            transparent 40%, 
            ${theme.palette.background.default} 95%
        )`,
      pointerEvents: "none"
    }
  },
  listContainer: {
    display: "flex",
    flexDirection: "column"
  },
  expandButton: {
    alignSelf: "center",
    padding: 8,
    marginTop: 16,
    "&:hover": {
      color: theme.palette.secondary.main
    }
  },
  collapseButton: {
    transform: "rotate(180deg)"
  }
})

export default statsPageStyle;