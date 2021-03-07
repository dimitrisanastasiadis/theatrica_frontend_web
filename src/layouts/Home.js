import { Grid, makeStyles } from "@material-ui/core"
import React from "react"
import style from "../assets/jss/layouts/homeStyle"
import ContentSlider from "../components/ContentSlider"
import ArtistCard from "../components/ArtistCard"
import data from "../mockData"

const useStyles = makeStyles(style)

function Home(props) {
    const classes = useStyles()

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