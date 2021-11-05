import React, { useState } from "react"
import { makeStyles, Typography, Paper, Tab, Tabs, AppBar, Table, TableBody, TableRow, TableCell, TableContainer, Toolbar, IconButton } from "@material-ui/core"
import style from "../../src/assets/jss/layouts/showDetailsStyle"
import he from "he"
import ItemsList from "../../src/components/ItemsList"
import LoadingScene from "../../src/components/LoadingScene"
import Image from "next/image"
import { mainFetcher } from "../../src/utils/AxiosInstances"
import getShowImage from "../../src/utils/getShowImage"
import getShowEvents from "../../src/utils/getShowEvents"
import DefaultImage from "../../public/DefaultShowImage.webp"
import { useRouter } from "next/router"
import clsx from 'clsx'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import useFavoriteShow from "../../src/hooks/useFavoriteShow";
import useWatchlist from "../../src/hooks/useWatchlist"
import AspectRatioSizer from "../../src/utils/AspectRatioSizer"
import ReactPlayer from "react-player/youtube"
import Link from "next/link"

export const getStaticPaths = async () => {
  const latestShows = await mainFetcher("/productions/latest?page=0&size=10");
  const paths = latestShows.content.map(show => ({
    params: { id: show.id.toString() }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const show = await mainFetcher(`/productions/${params.id}`)


  if (!show) {
    return {
      notFound: true
    }
  }
  
  const people = await mainFetcher(`/productions/${params.id}/people`)
  const events = await mainFetcher(`/productions/${params.id}/events`)

  const media = getShowImage(show.mediaURL)

  const { pastEvents, upcomingEvents } = getShowEvents(events)

  return {
    props: { show, people, pastEvents, upcomingEvents, media }
  }
}

const useStyles = makeStyles(style);

function TabPanel(props) {
  return (
    <div
      hidden={props.value !== props.index}
      {... props}>
      {props.value === props.index &&
        props.children}
    </div>
  );
}

const getArtistsByRole = (people) => {
  let actors, crew;

  if (people){
    let artistGroups = people.reduce((r, a) => {
      r[a.role] = [...r[a.role] || [], a];
      return r;
      }, {});
    const {"Ηθοποιός": actorsTemp, ...crewTemp} = artistGroups;
    actors = actorsTemp;
    crew = crewTemp;
  }

  return {actors, crew}
}

function ShowDetails({ show, people, pastEvents, upcomingEvents, media }) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();

  const { isFavorite, setIsFavorite } = useFavoriteShow(show && show.id);
  const { inWatchlist, setInWatchlist } = useWatchlist(show && show.id);

  const hasTrailer = React.useMemo(() => {
    return (
      show && show.mediaURL && (show.mediaURL.includes("youtube") || show.mediaURL.includes("youtu.be"))
    )
  }, [show])

  const artists = React.useMemo(() => {
    return getArtistsByRole(people)
  }, [people])

  if(router.isFallback){
    return <LoadingScene fullScreen />
  }

  let description = "";

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  } 

  if (show.description){
    description = show.description.split("\n");
  }

  const handleFavorite = () => {
    setIsFavorite(prev => !prev);
  }

  const handleWatchlist = () => {
    setInWatchlist(prev => !prev);
  }

  console.log(Object.entries(artists.crew))

  return (
        <div className={classes.pageWrapper}>
          <div className={classes.overview}>
            <div className={classes.titleActions}>
              <Typography variant="h2" component="h1">{show.title}</Typography>
              <div className={classes.actionIcons}>
                <IconButton size="small" className={classes.button} onClick={handleWatchlist}>
                  {inWatchlist ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
                </IconButton>
                <IconButton size="small" className={classes.button} onClick={handleFavorite}>
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </div>
            </div>
            <div className={classes.meta}>
              {pastEvents.length &&
                <Typography variant="body2">{pastEvents[pastEvents.length - 1].year}</Typography>
              }
              <Typography variant="body2" className="dotSeparator">2 ώρες 30 λεπτά</Typography>
            </div>
            <div className={classes.mediaContainer}>
              {(!hasTrailer) ?
                <div className={classes.imageNoTrailer}>
                  <Image src={media ? media : DefaultImage} alt={show.title} className={classes.image} layout="fill" objectFit="cover" />
                </div>
              : 
                <>
                  <div className={classes.imageTrailer}>
                    <Image src={media ? media : DefaultImage} alt={show.title} className={classes.image} layout="fill" objectFit="cover" />
                  </div>
                  <AspectRatioSizer widthRatio={16} heightRatio={9}>
                      <ReactPlayer 
                          url={show.mediaURL}
                          controls
                          width="100%"
                          height="100%"
                      />
                  </AspectRatioSizer>
                </>
              }
            </div>
            {people.length !== 0 &&
              <div className={classes.crewContainer}>
              {artists.crew[Object.keys(artists.crew)[0]] &&
                <div className={classes.crewCategory}>
                  <Typography variant="body1" className={classes.crewCategoryTitle}>{Object.keys(artists.crew)[0]}</Typography>
                  {artists.crew[Object.keys(artists.crew)[0]].map((artist, index) => 
                    <Link key={index} href={`/artists/${artist.id}`}>
                      <a className={classes.link}>
                        <Typography 
                          variant="body1"
                          className={(index>0) ? "dotSeparator" : ""}>
                            {artist.fullName}
                        </Typography>
                      </a>
                    </Link>
                  )}
                </div>
              }
              {artists.crew[Object.keys(artists.crew)[1]] &&
                <div className={classes.crewCategory}>
                  <Typography variant="body1" className={classes.crewCategoryTitle}>{Object.keys(artists.crew)[1]}</Typography>
                  {artists.crew[Object.keys(artists.crew)[1]].map((artist, index) => 
                    <Link key={index} href={`/artists/${artist.id}`}>
                      <a className={classes.link}>
                        <Typography 
                          variant="body1"
                          className={(index>0) ? "dotSeparator" : ""}>
                            {artist.fullName}
                        </Typography>
                      </a>
                    </Link>
                  )}
                </div>
              }
              {
                artists.actors && 
                  <div className={classes.crewCategory}>
                    <Typography variant="body1" className={classes.crewCategoryTitle}>Ερμηνεύουν</Typography>
                    {artists.actors.slice(0, 3).map((artist, index) => 
                      <Link key={index} href={`/artists/${artist.id}`}>
                        <a className={classes.link}>
                          <Typography 
                            variant="body1"
                            className={(index>0) ? "dotSeparator" : ""}>
                              {artist.fullName}
                          </Typography>
                        </a>
                      </Link>
                    )}
                  </div>
              }
              </div>
            }
          </div>
          <div className={classes.detailsBackground}>
            <div className={classes.details}>
                <div className={classes.tabsWrapper}>
                  <Tabs 
                    className={classes.tabs}
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    TabIndicatorProps={{
                      style:{display: "none"}
                    }}>
                    <Tab 
                      classes={{
                        wrapper: clsx(classes.tab, {
                          [classes.tabActive]: tabValue===0
                        })}} 
                      label="Περιγραφή" 
                      disableTouchRipple
                    />
                    <Tab 
                      classes={{
                        wrapper: clsx(classes.tab, {
                          [classes.tabActive]: tabValue===1
                        })}} 
                      label="Φωτογραφίες" 
                      disableTouchRipple
                    />
                    <Tab 
                      classes={{
                        wrapper: clsx(classes.tab, {
                          [classes.tabActive]: tabValue===2
                        })}} 
                      label="Συντελεστές" 
                      disableTouchRipple
                    />
                    <Tab 
                      classes={{
                        wrapper: clsx(classes.tab, {
                          [classes.tabActive]: tabValue===3
                        })}} 
                      label="Εκδηλώσεις" 
                      disableTouchRipple
                    />
                  </Tabs>
                </div>
                <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
                  {show.description &&
                    description.map((sentence, index) => 
                      <Typography key={index} paragraph variant="body1" style={{wordWrap: "break-word"}}>{he.decode(sentence)} </Typography>
                    )
                  }
                </TabPanel>
                <TabPanel value={tabValue} index={2} className={classes.tabPanel}>
                  <ItemsList items={artists.actors} title={false} type="/artists"/>
                  {
                    Object.keys(artists.crew).length !== 0 &&
                      <div className={classes.crewContainer}>
                        {
                          Object.entries(artists.crew).map(([category, artists], index) => 
                            <div key={index} className={classes.crewCategory}>
                              <Typography variant="body1" className={classes.crewCategoryTitle}>{category}</Typography>
                              {artists.map((artist, index) => 
                                <Link key={index} href={`/artists/${artist.id}`}>
                                  <a className={classes.link}>
                                    <Typography 
                                      variant="body1"
                                      className={(index>0) ? "dotSeparator" : ""}>
                                        {artist.fullName}
                                    </Typography>
                                  </a>
                                </Link>
                              )}
                            </div>
                          )
                        }
                      </div>
                  }
                </TabPanel>
                <TabPanel value={tabValue} index={3} className={classes.tabPanel}>
                  <AppBar position="static">
                    <Toolbar>
                      <Typography variant="h6">Προσεχώς</Typography>
                    </Toolbar>
                  </AppBar>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        {upcomingEvents.length ? upcomingEvents.map((event, index) => 
                          <TableRow hover key={index} className={classes.tableRow}>
                            <TableCell>
                              <Typography>{event.stringDate}</Typography>
                              <Typography>{event.time}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{event.title}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{event.priceRange}</Typography>
                            </TableCell>
                          </TableRow>
                      ) : <TableRow className={classes.tableRow}>
                            <TableCell>
                              <Typography>Δεν υπάρχουν εκδηλώσεις</Typography>
                            </TableCell>
                          </TableRow>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <AppBar position="static"  style={{marginTop: 50}}>
                    <Toolbar>
                      <Typography variant="h6">Ιστορικό Εκδηλώσεων</Typography>
                    </Toolbar>
                  </AppBar>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        {pastEvents.length ? pastEvents.map((event, index) => 
                          <TableRow hover key={index} className={classes.tableRow}>
                            <TableCell>
                                <Typography>{event.stringDate}</Typography>
                                <Typography>{event.time}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{event.title}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{event.priceRange}</Typography>
                            </TableCell>
                          </TableRow>
                      ) : <TableRow className={classes.tableRow}>
                            <TableCell>
                              <Typography>Δεν υπάρχουν εκδηλώσεις</Typography>
                            </TableCell>
                          </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
            </div>
          </div>
        </div>
  )
}

export default ShowDetails;