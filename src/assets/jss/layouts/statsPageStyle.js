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
    overflow: "hidden",
    display:"flex",
    marginTop: 100,
    gap: 50,
    flexWrap: "wrap"
  },
  chartContainer: {
    width: 400,
    height: 430
  }
})

export default statsPageStyle;