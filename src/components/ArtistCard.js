import React from "react";
import { makeStyles, Typography, Avatar, Zoom, useMediaQuery, useTheme } from "@material-ui/core";
import style from "../assets/jss/components/artistCardStyle";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useArtistData from "../hooks/useArtistData"
import { Skeleton } from "@material-ui/lab"

const useStyles = makeStyles(style);

function ArtistCard(props) {
    const classes = useStyles();
    const artistData = useArtistData(props.id);
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <React.Fragment>
            {artistData ?
                <Zoom in={true} style={{ transitionDelay: props.delay ? `${props.delay * 200}ms` : '0ms' }}>
                    <Link to={`/artists/${props.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <div className={classes.container}>
                            <Avatar className={classes.avatar} alt="Artist Photo" src={artistData.image} />
                            <Typography variant="body1" component="h4">{artistData.fullName}</Typography>
                            {props.role ? 
                                <Typography variant="body2" component="h5" className={classes.subtitle}>{props.role}</Typography>
                                :(artistData.productions &&
                                    <Typography variant="body2" component="h5" className={classes.subtitle}>{artistData.productions.length ? artistData.productions[0].title : ""}</Typography>)
                            }
                        </div>
                    </Link>
                </Zoom> : 
                <div>
                    <Skeleton variant="circle" width={isSmUp ? 180 : 135} height={isSmUp ? 180 : 135} />
                    <Typography variant="body1">
                        <Skeleton />
                    </Typography>
                    <Typography variant="body2">
                        <Skeleton />
                    </Typography>
                </div>
            }
        </React.Fragment>
    )
}

ArtistCard.propTypes = {
    id: PropTypes.number.isRequired,
    role: PropTypes.string,
    delay: PropTypes.number
}

export default ArtistCard;