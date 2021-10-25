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

const useStyles = makeStyles(style);

function ShowCard({ id, title, media }){
    const classes = useStyles();

    const [isFavorite, setIsFavorite] = useState(false);
    const [inWatchlist, setInWatchlist] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("favoriteShows") === null){
            localStorage.setItem("favoriteShows", JSON.stringify([]));
        }else{
            const favoriteShows = JSON.parse(localStorage.favoriteShows);
            if (favoriteShows.includes(id)){
                setIsFavorite(true);
            }
        }

        if (localStorage.getItem("watchlist") === null){
            localStorage.setItem("watchlist", JSON.stringify([]));
        }else{
            const watchlist = JSON.parse(localStorage.watchlist);
            if (watchlist.includes(id)){
                setInWatchlist(true);
            }
        }
    }, [id])

    useEffect(() => {
        let favoriteShows = JSON.parse(localStorage.favoriteShows);
        if (isFavorite){
            favoriteShows.push(id);
        }else{
            favoriteShows = favoriteShows.filter(item => item !== id);
        }
        localStorage.favoriteShows = JSON.stringify(favoriteShows);
    }, [isFavorite, id])

    useEffect(() => {
        let watchlist = JSON.parse(localStorage.watchlist);
        if (inWatchlist){
            watchlist.push(id);
        }else{
            watchlist = watchlist.filter(item => item !== id);
        }
        localStorage.watchlist = JSON.stringify(watchlist);
    }, [inWatchlist, id])

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