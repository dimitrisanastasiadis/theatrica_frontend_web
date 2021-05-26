import { Grid, makeStyles, Hidden, Divider, LinearProgress, Typography } from "@material-ui/core"
import React from "react"
import style from "../assets/jss/layouts/homeStyle"
import ContentSlider from "../components/ContentSlider"
import ArtistCard from "../components/ArtistCard"
import data from "../mockData"
import VideoContainer from "../components/VideoContainer"
import PropTypes from "prop-types"

const useStyles = makeStyles(style)

function Home(props) {
    const classes = useStyles();
    const artists = [1908, 1928, 2000, 2007, 2027, 2029, 2037, 2039, 2113, 2124, 2165, 2167, 2168, 2189, 2191]

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
                {artists ?
                    <ContentSlider title="Καλλιτέχνες" description="Δημοφιλείς Ηθοποιοί" drawerOpen={props.drawerOpen}>
                        {artists.map((id, index) => 
                            <ArtistCard 
                                id={id}
                                key={index}
                                delay={index} />)}
                    </ContentSlider> : 
                    <div className={classes.loading}>
                        <Typography variant="h5">Interviewing actors. Please wait...</Typography>
                        <LinearProgress color="secondary" className={classes.progressBar}/>
                    </div>
                }
            </Grid>
            <Hidden mdDown>
                <Grid item md={9}>
                    <Divider className={classes.divider} flexItem />
                </Grid>
            </Hidden>
        </Grid>
    )
}

Home.propTypes = {
    drawerOpen: PropTypes.bool
}

export default Home;