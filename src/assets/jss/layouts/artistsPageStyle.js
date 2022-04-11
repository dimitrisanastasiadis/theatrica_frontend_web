const artistsPageStyle = theme => ({
  artistsContainer: {
    maxWidth: 1250,
    margin: "0px auto",
    display: "flex",
    padding: 15,
    [theme.breakpoints.up("md")]: {
      paddingLeft: 70
    },
  },
  filtersContainer: {
    padding: "0 10px",
    width: 300,
    marginTop: 48,
    marginRight: -55,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "flex-start"
  },
  drawer: {
    overflow: "hidden"
  },
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 5
  }
})

export default artistsPageStyle