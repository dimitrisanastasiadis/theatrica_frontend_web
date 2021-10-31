import React, { useMemo } from "react";
import { makeStyles, Avatar, Typography, List, ListItem, ListItemText, Divider, IconButton, useMediaQuery } from "@material-ui/core"
import style from "../../src/assets/jss/layouts/artistDetailsStyle"
import LoadingScene from "../../src/components/LoadingScene";
import { useRouter } from "next/router"
import { mainFetcher } from "../../src/utils/AxiosInstances";
import Link from "next/link"
import Image from "next/image"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import useFavoriteArtist from "../../src/hooks/useFavoriteArtist"

export const getStaticPaths = async () => {
  const artistIDs = [1908, 1928, 2000, 2007, 2027, 2029, 2037, 2039, 2113, 2124, 2165, 2167, 2168, 2189, 2191];
  const paths = artistIDs.map(id => ({
    params: { id: id.toString() }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const artist = await mainFetcher(`/people/${params.id}`)

  if (!artist) {
    return {
      notFound: true
    }
  }
  
  const productions = await mainFetcher(`/people/${params.id}/productions`)

  const images = [
    "https://image.tmdb.org/t/p/w300/bjYL6zFdE6R4ycMRzCueFwy1xhn.jpg",
    "https://image.tmdb.org/t/p/w300/8rr9KTDZ4iSJWKjNrJo5ZPsRbCj.jpg",
    "https://image.tmdb.org/t/p/w300/bEhOnNpRPbROUn0Gudf64cGOmPZ.jpg",
    "https://image.tmdb.org/t/p/w300/hlrtsa0ivHsKzbQGcI78cBZn1gd.jpg",
    "https://image.tmdb.org/t/p/w300/bjYL6zFdE6R4ycMRzCueFwy1xhn.jpg",
    "https://image.tmdb.org/t/p/w300/8rr9KTDZ4iSJWKjNrJo5ZPsRbCj.jpg"
  ]

  return {
    props: { artist, productions, images }
  }
}

const useStyles = makeStyles(style);

const getProductionsByRole = (productions) => {
  let productionGroups = {};
  
  if (productions){
    productionGroups = productions.content.reduce((r, a) => {
      r[a.role] = [...r[a.role] || [], a];
      return r;
    }, {});
  }

  return productionGroups;
}

function ArtistDetails({ artist, productions, images }) {
  const router = useRouter();

  const classes = useStyles();
  const mdDown = useMediaQuery("(max-width:960px)");
  
  const { isFavorite, setIsFavorite } = useFavoriteArtist(artist.id);

  const productionGroups = useMemo(() => {
    return getProductionsByRole(productions)
  }, [productions])

  if (router.isFallback){
    return <LoadingScene fullScreen />
  }

  const handleFavorite = () => {
    setIsFavorite(prev => !prev);
  }

  console.log(Object.entries(productionGroups))
  
  return (
    <div className={classes.container}>
      <section className={classes.overview}>
        <Avatar alt="Artist Photo" variant="square" className={classes.avatar}>
          {artist.image[0] && 
              <Image src={artist.image[0]} alt="Artist Photo" width={300} height={450} />
          }
        </Avatar>
        <Typography variant="h2" component="h1" className={classes.name}>{artist.fullName}</Typography>
        <IconButton size="small" className={classes.favoriteIcon} onClick={handleFavorite}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body1" className={classes.bio}>
          Quisque tincidunt porta neque, vitae aliquet quam hendrerit id. Nulla facilisi. Sed hendrerit elit eu vulputate auctor. Mauris ac tincidunt dui. Suspendisse nec sagittis neque, et efficitur nisl. Proin molestie mollis tortor, id sodales risus. Phasellus mi ante, viverra vel euismod eget, vulputate vel libero. Curabitur sem tellus, posuere id est eu, auctor imperdiet mauris. Morbi euismod facilisis dolor, in vestibulum mauris mattis non. Donec sit amet tempor augue, a elementum nisl.
        </Typography>
        <Typography variant="body1" className={classes.birthday}><strong>Ημερομηνία Γέννησης: </strong>11 Μαρτίου, 1977</Typography>
      </section>
      <section>
        <Typography variant="h4" component="h2" className={classes.sectionTitle}>Φωτογραφίες</Typography>
        <div className={classes.photographsContainer}>
          {images.map((url, index) => {
            if ((mdDown && index < 4) || !mdDown){
              return (
                <div key={index} className={classes.photograph}>
                  <Image src={url} alt={`${artist.fullName} profile picture`} layout="fill" objectFit="cover" />
                </div>
              )
            }
          })}
        </div>
      </section>
      {Object.entries(productionGroups).map(([key, value], index) => 
        <section key={index}>
          <Typography variant="h4" component="h2" className={classes.sectionTitle}>{key}</Typography>
          <List className={classes.list}>
            {value.map((play, index) => 
              <ListItem key={index} className={classes.listItem}>
                <Link href={`/shows/${play.productionId}`} >
                  <a className={classes.link}>
                    <ListItemText primary={play.title} />
                  </a>
                </Link>
                <ListItemText className={classes.year} primary="2020" />
              </ListItem>
            )}
          </List>
        </section>
      )}
      <section>
        <Typography variant="h4" component="h2" className={classes.sectionTitle}>Social</Typography>
        <div className={classes.socialContainer}>
          <a href="https://www.twitter.com" className={`linksNoDecoration ${classes.social}`}>
            <div className={classes.socialLogo}>
              <Image src="/TwitterLogo.svg" width={32} height={32} alt="Twitter Logo" />
            </div>
            <Typography variant="body1">Twitter</Typography>
          </a>
          <a href="https://www.facebook.com" className={`linksNoDecoration ${classes.social}`}>
            <div className={classes.socialLogo}>
              <Image src="/FacebookLogo.svg" width={32} height={32} alt="Facebook Logo" />
            </div>
            <Typography variant="body1">Facebook</Typography>
          </a>
          <a href="https://www.instagram.com" className={`linksNoDecoration ${classes.social}`}>
            <div className={classes.socialLogo}>
              <Image src="/InstagramLogo.svg" width={32} height={32} alt="Instagram Logo" />
            </div>
            <Typography variant="body1">Instagram</Typography>
          </a>
        </div>
      </section>
    </div>
  )
}

export default ArtistDetails;