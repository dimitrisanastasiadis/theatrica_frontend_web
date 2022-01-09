/* eslint-disable @next/next/no-img-element */
import { makeStyles, IconButton, Typography } from "@material-ui/core";
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import style from "../assets/jss/components/mediaViewerStyle"
import { useEffect, useState } from "react";
import useScrollbarSize from 'react-scrollbar-size';

const useStyles = makeStyles(style);

const MediaViewer = ({ media, currentImage, setVisibility }) => {
  const classes = useStyles();

  const [mediaIndex, setMediaIndex] = useState(currentImage)

  const { width: scrollBarWidth } = useScrollbarSize();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`
    document.getElementById("navbar").style.paddingRight = `${scrollBarWidth}px`
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = 'unset'
      document.getElementById("navbar").style.paddingRight = 'unset'
    };
  }, [scrollBarWidth]);

  const handleClickAway = event => {
    if (event.target.id === "modal"){
      setVisibility(false)
    }
  }

  const handlePrev = () => {
    setMediaIndex(prevIndex => prevIndex - 1)
  }

  const handleNext = () => {
    setMediaIndex(prevIndex => prevIndex + 1)
  }

  return (
    <div id="modal" className={classes.modal} onClick={handleClickAway}>
      <IconButton className={classes.closeButton} aria-label="close media viewer" onClick={() => { setVisibility(false) }}>
        <CloseRoundedIcon fontSize="large" />
      </IconButton>
      <IconButton disabled={mediaIndex === 0} className={classes.beforeButton} aria-label="close media viewer" onClick={handlePrev}>
        <NavigateBeforeRoundedIcon fontSize="large" />
      </IconButton>
      <IconButton disabled={mediaIndex === media.length - 1 } className={classes.nextButton} aria-label="close media viewer" onClick={handleNext}>
        <NavigateNextRoundedIcon fontSize="large" />
      </IconButton>

      <div className={classes.media}>
        <img className={classes.responsiveImage} src={media[mediaIndex]} alt={`profile picture`} loading="lazy" />
        <Typography className={classes.counter} variant="body1">{`${mediaIndex + 1} / ${media.length}`}</Typography>
      </div>
    </div>
  );
}

export default MediaViewer;