import React from "react"
import { makeStyles } from "@material-ui/core"
import PropTypes from "prop-types"

const style = theme => ({
    aspectRatioSizer: {
        display: "grid",
        "& > *": {
            gridArea: "1 / 1 / 2 / 2"
        },
        width: "66%",
        flexShrink: 0,
        [theme.breakpoints.down("md")]: {
            width: "100%"
        },
        float: "left",
        marginRight: 20
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

AspectRatioSizer.propTypes = {
    widthRatio: PropTypes.number,
    heightRatio: PropTypes.number
}

export default AspectRatioSizer;