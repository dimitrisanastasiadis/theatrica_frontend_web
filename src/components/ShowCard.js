import React from "react"
import { makeStyles, Card, CardMedia, CardContent, Typography } from "@material-ui/core"
import style from "../assets/jss/components/showCardStyle"
import PropTypes from "prop-types"
import DefaultImage from "../../public/DefaultShowImage.webp"
import Image from "next/image"
import Link from "next/link"

const useStyles = makeStyles(style);

function ShowCard({ id, title, media }){
    const classes = useStyles();

    return (
    <Link href={`/shows/${id}`}>
        <a className="linksNoDecoration">
            <div className={classes.cardContainer}>
                <Card className={classes.card}>
                    <CardMedia className={classes.cardImg}>
                        <Image src={media ? media : DefaultImage} alt={`${title} thumbnail`} layout="fill" objectFit="cover" />
                    </CardMedia> 
                    <CardContent className={classes.cardTitle}>
                        <Typography variant="body1" component="h2">
                            {title}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </a>
    </Link>
    )
}

ShowCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    media: PropTypes.string
}

export default ShowCard;