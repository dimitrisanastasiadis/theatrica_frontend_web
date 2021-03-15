import { Grid, makeStyles, Hidden, Divider } from "@material-ui/core"
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
          const response = await axios.get('http://192.168.2.9:8080/api/people');
          setTestData(response.data.data);
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
                <ContentSlider title="Καλλιτέχνες" description="Δημοφιλείς Ηθοποιοί" drawerOpen={props.drawerOpen}>
                    {data.artists.map((artist, index) => 
                        <ArtistCard 
                            name={artist.name}
                            img={artist.img}
                            play={artist.play}
                            key={index}
                            delay={index} />)}
                </ContentSlider>
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