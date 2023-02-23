import { makeStyles, Card, CardMedia, Typography, IconButton } from "@material-ui/core"
import style from "../assets/jss/components/showCardStyle"
import Image from "next/image"
import Link from "next/link"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import useFavoriteVenue from "../hooks/useFavoriteVenue";

const useStyles = makeStyles(style);

function VenueCard({ id, title }){
    const classes = useStyles();

    const { isFavorite, setIsFavorite } = useFavoriteVenue(id);

    const handleFavorite = () => {
        setIsFavorite(prev => !prev);
    }

    return (
        <div className={classes.cardContainer}>
            <Card className={classes.card}>
                <CardMedia className={classes.cardImg}>
                    <Link href={`/venues/${id}`}>
                        <a className="linksNoDecoration">
                            <div className={classes.imageContainer}>
                                <Image src="/DefaultShowImage.jpg" alt={`${title} thumbnail`} layout="fill" objectFit="cover" />
                            </div>
                        </a>
                    </Link> 
                </CardMedia>
                <div className={classes.cardTitle}>
                    <Link href={`/venues/${id}`}>
                        <a className={classes.link}>
                        <Typography variant="body1" component="h2">
                            {title}
                        </Typography>
                        </a>
                    </Link> 
                </div>
                <div className={classes.icons} style={{justifyContent: "flex-end"}}>
                    <IconButton size="small" className={classes.button} onClick={handleFavorite}>
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </div>
            </Card>
        </div>
    )
}

export default VenueCard;