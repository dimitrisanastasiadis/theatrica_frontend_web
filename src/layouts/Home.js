import { Grid, makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import style from "../assets/jss/layouts/homeStyle"
import ContentSlider from "../components/ContentSlider"
import ArtistCard from "../components/ArtistCard"
import data from "../mockData"
import axios from "axios"

const useStyles = makeStyles(style)

function Home(props) {
    const classes = useStyles();

    const [testData, setTestData] = useState([]);

    const getData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/people');
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
            <Grid item xs={12} md={9}>
                <ContentSlider title="Καλλιτέχνες" description="Δημοφιλείς Ηθοποιοί">
                    {data.artists.map((artist, index) => 
                        <ArtistCard 
                            name={artist.name}
                            img={artist.img}
                            play={artist.play}
                            key={index}
                            delay={index} />)}
                </ContentSlider>
            </Grid>
            <Grid item xs={12} sm={9}>
                
            </Grid>
        </Grid>
            
            
                
    )
}

export default Home;