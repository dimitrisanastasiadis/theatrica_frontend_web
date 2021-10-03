import React from "react";
import { Grid, makeStyles, Avatar, Paper, Typography, Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Divider } from "@material-ui/core"
import style from "../../src/assets/jss/layouts/artistDetailsStyle"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import LoadingScene from "../../src/components/LoadingScene";
import { useRouter } from "next/router"
import { mainFetcher } from "../../src/utils/AxiosInstances";
import Link from "next/link"

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

  return {
    props: { artist, productions }
  }
}

const useStyles = makeStyles(style);

function ArtistDetails({ artist, productions }) {
  const router = useRouter();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel0");

  if (router.isFallback){
    return <LoadingScene fullScreen />
  }

  let productionGroups = {};

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }
  
  if (productions){
    productionGroups = productions.content.reduce((r, a) => {
      r[a.role] = [...r[a.role] || [], a];
      return r;
    }, {});
  }
  
  return (
    <Grid container justify="center" className={classes.grid}>
      <Grid item xs={12} md={9} lg={7} className={classes.gridItem}>
        <Paper elevation={3} className={classes.card}>
          <div className={classes.container}>
            <Avatar src={artist.image} variant="rounded" alt={`Photo of ${artist.fullName}`} className={classes.avatar}/>
            <div style={{overflow: "auto", textAlign: "center"}}>
                <Typography variant="h4">{artist.fullName}</Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9} lg={7} className={classes.gridItem}>
        <Paper elevation={3} className={classes.card}>
          <Typography variant="h4">Θεατρικές Παραστάσεις</Typography>
          <div className={classes.accordionContainer}>
            {
              Object.entries(productionGroups).map(([key, value], index) => 
                <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} className={classes.accordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${key}-content`}
                    id={`panel-${key}-header`}>
                    <Typography className={classes.categoryTitle} variant="h6">{key}</Typography>                                                
                  </AccordionSummary>
                  <AccordionDetails>
                    <List style={{width: "100%"}}>
                      {value.map((play, index) => 
                        <React.Fragment key={index}>
                          {index > 0 && <Divider/>}
                            <ListItem>
                              <Link href={`/shows/${play.productionId}`} >
                                <a className={classes.link}>
                                  <ListItemText primary={play.title} />
                                </a>
                              </Link>
                            </ListItem>
                        </React.Fragment>
                      )}
                    </List>
                  </AccordionDetails>
                </Accordion>
              )
            }
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ArtistDetails;