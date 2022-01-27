const savedPageStyle = theme => ({
  container: {
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: 20,
    padding: "20px 10px 15px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      padding: "20px 40px 15px",
    },
    marginBottom: "5em",
    marginTop: "3em"
  },
  items: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "20px 0",
    flexWrap: "wrap",
    gap: 10
  },
  divider: {
    width: "100%",
    marginBottom: 15
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
    cursor: "pointer",
    "&:active": {
      color: theme.palette.secondary.light
    }
  }
})

export default savedPageStyle