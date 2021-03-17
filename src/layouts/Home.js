import { Grid, makeStyles, Hidden, Divider, LinearProgress, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import style from "../assets/jss/layouts/homeStyle"
import ContentSlider from "../components/ContentSlider"
import ArtistCard from "../components/ArtistCard"
import data from "../mockData"
import axios from "axios"
import VideoContainer from "../components/VideoContainer"

const useStyles = makeStyles(style)

function Home(props) {
    const classes = useStyles();

    const [testData, setTestData] = useState([]);

    const getData = async () => {
        try {
          const response = await axios.get('http://192.168.2.9:8080/api/people?page=1&size=10');
          const artists = response.data.data;
          let responseProductions
          await Promise.all(
              artists.map(async (artist, index) => {
                responseProductions = await axios.get(`http://192.168.2.9:8080/api/people/${artist.id}/productions`);
                artists[index].productions = responseProductions.data.data;
              })
          )
          setTestData(artists);
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

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
                {testData.length ?
                <ContentSlider title="Καλλιτέχνες" description="Δημοφιλείς Ηθοποιοί" drawerOpen={props.drawerOpen}>
                    {testData.map((artist, index) => 
                        <ArtistCard 
                            name={artist.fullName}
                            play={artist.productions[0].title}
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