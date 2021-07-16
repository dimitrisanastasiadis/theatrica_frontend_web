import React from "react";
import {Typography, LinearProgress, makeStyles} from "@material-ui/core"
import style from "../assets/jss/components/loadingSceneStyle"
import clsx from "clsx"
import PropTypes from "prop-types"

const useStyles = makeStyles(style);

function LoadingScene(props){
    const classes = useStyles();

    return (
        <div className={clsx(classes.loading, {
            [classes.fullScreen]: props.fullScreen
        })}>
            <Typography variant="h5" className={classes.title}>Interviewing actors. Please wait...</Typography>
            <LinearProgress color="secondary" className={classes.progressBar}/>
        </div>
    )
}

LoadingScene.propTypes = {
    fullScreen: PropTypes.bool
}

export default LoadingScene;