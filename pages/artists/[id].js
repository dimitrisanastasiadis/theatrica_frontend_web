import React, { useMemo, useState } from "react";
import { makeStyles, Avatar, Typography, List, ListItem, ListItemText, Divider, IconButton, useMediaQuery } from "@material-ui/core"
import style from "../../src/assets/jss/layouts/artistDetailsStyle"
import LoadingScene from "../../src/components/LoadingScene";
import { useRouter } from "next/router"
import { mainFetcher, tmdbFetcher } from "../../src/utils/AxiosInstances";
import Link from "next/link"
import Image from "next/image"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import useFavoriteArtist from "../../src/hooks/useFavoriteArtist"
import MediaViewer from "../../src/components/MediaViewer";
import Head from "next/head"

const placeHolderBio = "Quisque tincidunt porta neque, vitae aliquet quam hendrerit id. Nulla facilisi. Sed hendrerit elit eu vulputate auctor. Mauris ac tincidunt dui. Suspendisse nec sagittis neque, et efficitur nisl. Proin molestie mollis tortor, id sodales risus. Phasellus mi ante, viverra vel euismod eget, vulputate vel libero. Curabitur sem tellus, posuere id est eu, auctor imperdiet mauris. Morbi euismod facilisis dolor, in vestibulum mauris mattis non. Donec sit amet tempor augue, a elementum nisl."

export const getStaticPaths = async () => {
  const artistIDs = [5555, 6846, 4770, 4791, 8158, 5047, 5233, 5428, 4691, 5192, 4962, 6643, 4659, 6104];
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


  const URI = encodeURI(`/search/person?query=${artist.fullName}`)
  const tmdbSearch = await tmdbFetcher(URI)
  const tmdbResults = tmdbSearch.results
  tmdbResults.sort((a, b) => b.popularity - a.popularity)

  let images = []

  if (tmdbResults.length > 0) {
    artist.image = `https://image.tmdb.org/t/p/w300${tmdbResults[0].profile_path}`

    images = await tmdbFetcher(`/person/${tmdbResults[0].id}/images`)
    images = images.profiles
    images = images.map(image => {
      const imagePath = `https://image.tmdb.org/t/p/w300${image.file_path}`
      return imagePath
    })
    images = images.slice(0, 6)

    const details = await tmdbFetcher(`/person/${tmdbResults[0].id}`)

    if (details.birthday) {
      artist.birthday = details.birthday
    }

    const translations = await tmdbFetcher(`/person/${tmdbResults[0].id}/translations`)

    if (translations.translations.length > 0) {
      translations.translations.forEach(translation => {
        if (translation.english_name === "Greek") {
          artist.biography = translation.data.biography
        }
      })
    }

  }

  return {
    props: { artist, productions, images }
  }
}

const useStyles = makeStyles(style);

const getProductionsByRole = (productions) => {
  let productionGroups = {};

  if (productions) {
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

  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);

  const { isFavorite, setIsFavorite } = useFavoriteArtist(artist && artist.id);

  const productionGroups = useMemo(() => {
    return getProductionsByRole(productions)
  }, [productions])

  const stringBirthday = useMemo(() => {
    if (artist && artist.birthday) {
      return new Date(artist.birthday).toLocaleDateString("el", { day: "numeric", month: "long", "year": "numeric" })
    }
    return ""
  }, [artist])

  if (router.isFallback) {
    return <LoadingScene fullScreen />
  }

  const handleFavorite = () => {
    setIsFavorite(prev => !prev);
  }

  const handleImageClick = event => {
    setMediaIndex(Number(event.currentTarget.getAttribute('index')))
    setMediaViewerOpen(true);
  }

  return (
    <>
      <Head>
        <title>{artist.fullName} | Theatrica</title>
      </Head>
      <div className={`pageWrapper ${classes.wrapper}`}>
        <div className={`pageContent ${classes.container}`}>
          <section className={classes.overview}>
            <Avatar alt="Artist Photo" variant="square" className={classes.avatar}>
              {artist.image ?
                <Image src={artist.image} alt="Artist Photo" width={300} height={450} /> : null
              }
            </Avatar>
            <Typography variant="h2" component="h1" className={classes.name}>{artist.fullName}</Typography>
            <IconButton size="small" className={classes.favoriteIcon} onClick={handleFavorite}>
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body1" className={classes.bio}>
              {artist.biography || placeHolderBio}
            </Typography>
            <Typography variant="body1" className={classes.birthday}>
              <strong>Ημερομηνία Γέννησης: </strong>{stringBirthday || "N/A"}
            </Typography>
          </section>
          <section>
            {mediaViewerOpen && <MediaViewer media={images} currentImage={mediaIndex} setVisibility={setMediaViewerOpen} />}
            <Typography variant="h4" component="h2" className={classes.sectionTitle}>Φωτογραφίες</Typography>
            <div className={classes.photographsContainer}>
              {images.length > 0 ?
                <>
                  {images.map((url, index) => {
                    if ((mdDown && index < 4) || !mdDown) {
                      return (
                        <div key={index} index={index} className={classes.photograph} onClick={handleImageClick}>
                          <Image src={url} alt={`${artist.fullName} profile picture`} layout="fill" objectFit="cover" />
                        </div>
                      )
                    }
                  })}
                </> :
                <Typography variant="body1">Δεν υπάρχουν φωτογραφίες</Typography>
              }
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
      </div>
    </>

  )
}

export default ArtistDetails;