import { Grid, makeStyles, Hidden, Divider } from "@material-ui/core"
import style from "../src/assets/jss/layouts/homeStyle"
import ContentSlider from "../src/components/ContentSlider"
import ArtistCard from "../src/components/ArtistCard"
import data from "../src/mockData"
import VideoContainer from "../src/components/VideoContainer"
import useItemsIDs from "../src/hooks/useItemsIDs"
import ShowCard from "../src/components/ShowCard"
import LoadingScene from "../src/components/LoadingScene"

const useStyles = makeStyles(style)

function Home(props) {
    const classes = useStyles();
    const artists = [1908, 1928, 2000, 2007, 2027, 2029, 2037, 2039, 2113, 2124, 2165, 2167, 2168, 2189, 2191]
    const {items: latestShows} = useItemsIDs("/productions/latest", 0, 10);

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
                    <ContentSlider title="Καλλιτέχνες" description="Δημοφιλείς Ηθοποιοί">
                        {artists.map((id, index) => 
                            <ArtistCard 
                                id={id}
                                key={index}
                                delay={index} />)}
                    </ContentSlider> : 
                    <LoadingScene />
                }
            </Grid>
            <Hidden mdDown>
                <Grid item md={9}>
                    <Divider className={classes.divider} flexItem />
                </Grid>
            </Hidden>
            <Grid item xs={12} md={9} className={classes.gridItem}>
                {latestShows ?
                    <ContentSlider title="Νέες Παραστάσεις">
                        {latestShows.map((item) => 
                            <ShowCard 
                                id={item.id}
                                key={item.id} 
                            />)}
                    </ContentSlider> : 
                    <LoadingScene />
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

export default Home;