import { Grid, makeStyles, Hidden, Divider, LinearProgress, Typography } from "@material-ui/core"
import React from "react"
import style from "../assets/jss/layouts/homeStyle"
import ContentSlider from "../components/ContentSlider"
import ArtistCard from "../components/ArtistCard"
import data from "../mockData"
import VideoContainer from "../components/VideoContainer"
import useArtistData from "../hooks/useArtistData"

const useStyles = makeStyles(style)

function Home(props) {
    const classes = useStyles();
    const artistData = useArtistData(0, 20);

    return (
        <Grid container className={classes.grid} justify="center">
            <Grid item xs={12} md={9} className={classes.gridItem}>
                <VideoContainer production={data.productions} />
            </Grid>
            <Hidden mdDown>
                <Grid item md={9}>
                    <Divider className={classes.divider} flexItem />
                </Grid>
            </Hidden>
            <Grid item xs={12} md={9} className={classes.gridItem}>
                {artistData ?
                <ContentSlider title="Καλλιτέχνες" description="Δημοφιλείς Ηθοποιοί" drawerOpen={props.drawerOpen}>
                    {artistData.map((artist, index) => 
                        <ArtistCard 
                            id={artist.id}
                            name={artist.fullName}
                            play={artist.productions.length ? artist.productions[0].title : ""}
                            key={index}
                            delay={index} />)}
                </ContentSlider> : 
                <div className={classes.loading}>
                    <Typography variant="h5">Interviewing actors. Please wait...</Typography>
                    <LinearProgress color="secondary" className={classes.progressBar}/>
                </div>}
            </Grid>
            <Hidden mdDown>
                <Grid item md={9}>
                    <Divider className={classes.divider} flexItem />
                </Grid>
            </Hidden>
        </Grid>
    )
}

export default Home;