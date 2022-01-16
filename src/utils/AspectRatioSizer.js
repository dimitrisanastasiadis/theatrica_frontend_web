import React from "react"
import { makeStyles } from "@material-ui/core"

const style = theme => ({
    aspectRatioSizer: {
        display: "grid",
        "& > *": {
            gridArea: "1 / 1 / 2 / 2"
        },
        width: "100%"
    }
})

const useStyles = makeStyles(style);

function AspectRatioSizer(props) {
    const classes = useStyles();

    return (
        <div className={classes.aspectRatioSizer}>
            <svg viewBox={`0 0 ${props.widthRatio} ${props.heightRatio}`}></svg>
            {props.children}
        </div>
    )
}

export default AspectRatioSizer;