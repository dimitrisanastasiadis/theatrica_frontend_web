import { Grid, makeStyles, Hidden, Divider } from "@material-ui/core"
import style from "../src/assets/jss/layouts/homeStyle"
import ContentSlider from "../src/components/ContentSlider"
import ArtistCard from "../src/components/ArtistCard"
import data from "../src/mockData"
import VideoContainer from "../src/components/VideoContainer"
import useItemsIDs from "../src/hooks/useItemsIDs"
import ShowCard from "../src/components/ShowCard"
import LoadingScene from "../src/components/LoadingScene"
import { mainFetcher } from "../src/utils/AxiosInstances"

const useStyles = makeStyles(style)

export const getStaticProps = async () => {
    const artistIDs = [1908, 1928, 2000, 2007, 2027, 2029, 2037, 2039, 2113, 2124, 2165, 2167, 2168, 2189, 2191];
    let artists = await Promise.all(
            artistIDs.map(async id => {
                const artist = await mainFetcher(`/people/${id}`);
                return artist;
            })
        )
        
    artists = artists.filter(Boolean);

    return {
        props: { artists }
    }
}

function Home({ artists }) {
    const classes = useStyles();
    const {items: latestShows} = useItemsIDs("/productions/latest", 0, 10);

    console.log(artists)

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
                        {artists.map((artist, index) => 
                            <ArtistCard 
                                id={artist.id}
                                fullName = {artist.fullName}
                                image = {artist.image}
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