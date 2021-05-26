import React from "react"
import { makeStyles, Card, CardMedia, CardContent, Typography } from "@material-ui/core"
import style from "../assets/jss/components/showCardStyle"
import useShowData from "../hooks/useShowData"
import { Link } from "react-router-dom"


const useStyles = makeStyles(style);

function ShowCard(props){
    const classes = useStyles();
    const showData = useShowData(props.id);

    return (
        showData ?
        <Link to={`/shows/${showData.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardImg}
                    component="img"
                    alt={`${showData.title} thumbnail`}
                    image={showData.media}
                />
                <CardContent className={classes.cardTitle}>
                    <Typography variant="body1" component="h2">
                        {showData.title}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
        :
        <div>Loading</div>
    )
}

export default ShowCard;