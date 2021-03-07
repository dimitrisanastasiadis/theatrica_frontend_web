import React, { useEffect, useState } from "react";
import { makeStyles, Typography, Avatar, Zoom } from "@material-ui/core";
import style from "../assets/jss/components/artistCardStyle"

const useStyles = makeStyles(style);

function ArtistCard(props) {
    const classes = useStyles();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    }, [])

    return (
        <Zoom in={checked} style={{ transitionDelay: checked ? `${props.delay * 200}ms` : '0ms' }}>
            <div className={classes.container}>
                <Avatar className={classes.avatar} alt="Artist Photo" src={props.img} />
                <Typography variant="h5" component="h4">{props.name}</Typography>
                <Typography variant="h6" component="h5" className={classes.subtitle}>{props.play}</Typography>
            </div>
        </Zoom>
    )
}

export default ArtistCard;