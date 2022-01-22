const statsPageStyle = theme => ({
  calendarContainer: {
    width: "100%",
    marginTop: 10,
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
    display:"flex",
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
  }
})

export default statsPageStyle;