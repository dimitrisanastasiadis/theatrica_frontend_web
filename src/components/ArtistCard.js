import React, { useEffect, useState } from "react";
import { makeStyles, Typography, Avatar, Zoom } from "@material-ui/core";
import style from "../assets/jss/components/artistCardStyle";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const useStyles = makeStyles(style);

function ArtistCard(props) {
    const classes = useStyles();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    }, [])

    return (
        <Zoom in={checked} style={{ transitionDelay: checked ? `${props.delay * 200}ms` : '0ms' }}>
            <Link to="/artist" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className={classes.container}>
                    <Avatar className={classes.avatar} alt="Artist Photo" src={props.img} />
                    <Typography variant="body1" component="h4">{props.name}</Typography>
                    <Typography variant="body2" component="h5" className={classes.subtitle}>{props.play}</Typography>
                </div>
            </Link>
        </Zoom>
    )
}

ArtistCard.propTypes = {
    name: PropTypes.string,
    img: PropTypes.string,
    play: PropTypes.string,
    delay: PropTypes.number
}

export default ArtistCard;