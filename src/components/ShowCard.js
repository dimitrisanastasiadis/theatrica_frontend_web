import React, { useEffect, useState } from "react"
import { makeStyles, Card, CardMedia, CardContent, Typography, IconButton } from "@material-ui/core"
import style from "../assets/jss/components/showCardStyle"
import PropTypes from "prop-types"
import DefaultImage from "../../public/DefaultShowImage.webp"
import Image from "next/image"
import Link from "next/link"
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import useFavoriteShow from "../hooks/useFavoriteShow";
import useWatchlist from "../hooks/useWatchlist"

const useStyles = makeStyles(style);

function ShowCard({ id, title, media }){
    const classes = useStyles();

    const { isFavorite, setIsFavorite } = useFavoriteShow(id);
    const { inWatchlist, setInWatchlist } = useWatchlist(id);

    const handleFavorite = () => {
        setIsFavorite(prev => !prev);
    }

    const handleWatchlist = () => {
        setInWatchlist(prev => !prev);
    }

    return (
        <div className={classes.cardContainer}>
            <Card className={classes.card}>
                <CardMedia className={classes.cardImg}>
                    <Link href={`/shows/${id}`}>
                        <a className="linksNoDecoration">
                            <Image src={media ? media : DefaultImage} alt={`${title} thumbnail`} layout="fill" objectFit="cover" />
                        </a>
                    </Link> 
                </CardMedia>
                <CardContent className={classes.cardTitle}>
                <Link href={`/shows/${id}`}>
                    <a className={classes.link}>
                        <Typography variant="body1" component="h2">
                            {title}
                        </Typography>
                    </a>
                </Link> 
                    <div className={classes.icons} >
                        <IconButton size="small" className={classes.button} onClick={handleWatchlist}>
                            {inWatchlist ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
                        </IconButton>
                        <IconButton size="small" className={classes.button} onClick={handleFavorite}>
                            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

ShowCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    media: PropTypes.string
}

export default ShowCard;