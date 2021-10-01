import React from "react"
import { makeStyles, Card, CardMedia, CardContent, Typography } from "@material-ui/core"
import style from "../assets/jss/components/showCardStyle"
import useShowData from "../hooks/useShowData"
import PropTypes from "prop-types"
import { Skeleton } from "@material-ui/lab"


const useStyles = makeStyles(style);

function ShowCard({ id, title, media }){
    const classes = useStyles();

    return (
    // <Link to={`/shows/${showData.show.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <div className={classes.cardContainer}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardImg}
                    component="img"
                    alt={`${title} thumbnail`}
                    image={media}
                />
                <CardContent className={classes.cardTitle}>
                    <Typography variant="body1" component="h2">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    // </Link>
    )
}

ShowCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    media: PropTypes.string
}

export default ShowCard;