import React, { useState } from "react"
import { makeStyles, Typography, Paper, Tab, Tabs, AppBar, Table, TableBody, TableRow, TableCell, TableContainer, Toolbar } from "@material-ui/core"
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

// const getArtistsByRole = (people) => {
//   let actors, crew;

//   if (people){
//     let artistGroups = people.reduce((r, a) => {
//       r[a.role] = [...r[a.role] || [], a];
//       return r;
//       }, {});
//     const {"Ηθοποιός": actorsTemp, ...crewTemp} = artistGroups;
//     actors = actorsTemp;
//     crew = crewTemp;
//   }

//   return {actors, crew}
// }

function ShowDetails({ show, people, pastEvents, upcomingEvents, media }) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();

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

  // const artists = React.useMemo(() => {
  //   return getArtistsByRole(people)
  // }, [people])

  

  return (
        <div className={classes.pageWrapper}>
          <div className={classes.overview}>
            <Typography variant="h2" component="h1">{show.title}</Typography>
            <div style={{width: 200, height: 200, position: "relative"}}>
              <Image src={media ? media : DefaultImage} alt={show.title} className={classes.image} layout="fill" objectFit="contain" />
            </div>
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
                      label="Συντελεστές" 
                      disableTouchRipple
                    />
                    <Tab 
                      classes={{
                        wrapper: clsx(classes.tab, {
                          [classes.tabActive]: tabValue===2
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
                <TabPanel value={tabValue} index={1}>
                    <ItemsList items={people} role title={false} type="/artists"/>
                </TabPanel>
                <TabPanel value={tabValue} index={2} className={classes.tabPanel}>
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