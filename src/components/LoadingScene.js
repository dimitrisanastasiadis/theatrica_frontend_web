import React from "react";
import {Typography, LinearProgress, makeStyles} from "@material-ui/core"
import style from "../assets/jss/components/loadingSceneStyle"

const useStyles = makeStyles(style);

function LoadingScene(props){
    const classes = useStyles();

    return (
        <div className={classes.loading}>
            <Typography variant="h5" className={classes.title}>Interviewing actors. Please wait... </Typography>
            <LinearProgress color="secondary" className={classes.progressBar}/>
        </div>
    )
}

export default LoadingScene;