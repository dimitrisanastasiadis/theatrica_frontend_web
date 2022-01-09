const mediaViewerStyle = theme => ({
  modal: {
    position: "fixed",
    backgroundColor: "rgba(0, 0, 0, .9)",
    "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
      backgroundColor: "rgba(0, 0, 0, .8)",
      backdropFilter: "blur(5px)"
    },
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 2000
  },
  media: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  responsiveImage: {
    maxWidth: "100%",
    height: "auto"
  },
  counter: {
    alignSelf: "center",
    marginTop: 10
  },
  closeButton: {
    position: "absolute",
    right: 0,
    marginRight: "3vw",
    marginTop: 15
  },
  beforeButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)"
  },
  nextButton: {
    position: "absolute",
    top: "50%",
    right: 0,
    transform: "translateY(-50%)"
  }
})

export default mediaViewerStyle;