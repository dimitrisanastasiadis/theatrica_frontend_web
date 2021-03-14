import React, { useState } from "react";
import { makeStyles, Button, Fade, Typography, Hidden } from "@material-ui/core";
import style from "../assets/jss/components/videoContainerStyle";
import ReactPlayer from 'react-player/youtube';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import PropTypes from "prop-types";

const useStyles = makeStyles(style);

function VideoContainer(props) {
    const classes = useStyles();
    const [ production, setProduction ] = useState(props.production[0]);
    const [ playing, setPlaying ] = useState(false);

    const handleNext = () => {
        const currentIndex = props.production.indexOf(production);
        if(currentIndex === props.production.length-1){
            setProduction(props.production[0])
        }else{
            setProduction(props.production[currentIndex+1]);
        }
    }

    const handlePrev = () => {
        const currentIndex = props.production.indexOf(production);
        if(currentIndex === 0){
            setProduction(props.production[props.production.length-1])
        }else{
            setProduction(props.production[currentIndex-1]);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <Typography variant="h4" component="h2">Trailers</Typography>
                <Typography variant="h5" component="h3">{production.title}</Typography>
            </div>
            <div className={classes.bodyContainer}>
                <div className={classes.aspectRatioSizer}>
                    <svg viewBox="0 0 16 9"></svg>
                    <ReactPlayer 
                        url={production.url}
                        controls
                        width="100%"
                        height="100%"
                        onPlay={() => {setPlaying(true)}}
                        onPause={() => {setPlaying(false)}}
                        onEnded={() => {setPlaying(false)}}
                    />
                    <Fade in={!playing}>
                        <Button
                            onClick={handlePrev}
                            className={classes.button}>
                            <NavigateBeforeRoundedIcon fontSize="large"/>
                        </Button>
                    </Fade>
                    <Fade in={!playing}>
                        <Button
                            onClick={handleNext}
                            className={`${classes.button} ${classes.buttonNext}`}>
                            <NavigateNextRoundedIcon fontSize="large"/>
                        </Button>
                    </Fade>
                </div>
                <div className={classes.description}>
                    <Hidden mdDown>
                        <Typography component="p" variant="body1">{production.description}</Typography>
                    </Hidden>
                </div>
            </div>
        </div>  
    )
}

VideoContainer.propTypes = {
    production: PropTypes.array
}

export default VideoContainer;