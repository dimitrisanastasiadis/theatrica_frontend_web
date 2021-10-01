import React from "react";
import { makeStyles, Typography, Avatar, Zoom, useMediaQuery, useTheme } from "@material-ui/core";
import style from "../assets/jss/components/artistCardStyle";
import PropTypes from "prop-types";
import Image from "next/image"

const useStyles = makeStyles(style);

function ArtistCard({ id, fullName, image, delay }) {
    const classes = useStyles();
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <React.Fragment>
            <Zoom in={true} style={{ transitionDelay: delay ? `${delay * 200}ms` : '0ms' }}>
                {/* <Link to={`/artists/${props.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}> */}
                    <div className={classes.container}>
                        <Avatar className={classes.avatar} alt="Artist Photo">
                            <Image src={image} alt="Artist Photo" width={300} height={450} />
                        </Avatar>
                        <Typography variant="body1" component="h4">{fullName}</Typography>
                    </div>
                {/* </Link> */}
            </Zoom>
        </React.Fragment>
    )
}

ArtistCard.propTypes = {
    id: PropTypes.number.isRequired,
    fullName: PropTypes.string,
    image: PropTypes.string,
    delay: PropTypes.number
}

export default ArtistCard;