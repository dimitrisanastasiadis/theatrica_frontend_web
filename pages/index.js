import { makeStyles, Hidden, Divider } from "@material-ui/core"
import style from "../src/assets/jss/layouts/homeStyle"
import ContentSlider from "../src/components/ContentSlider"
import ArtistCard from "../src/components/ArtistCard"
import data from "../src/mockData"
import VideoContainer from "../src/components/VideoContainer"
import ShowCard from "../src/components/ShowCard"
import { mainFetcher } from "../src/utils/AxiosInstances"
import getShowImage from "../src/utils/getShowImage"

export const getStaticProps = async () => {
    const artistIDs = [1908, 1928, 2000, 2007, 2027, 2029, 2037, 2039, 2113, 2124, 2165, 2167, 2168, 2189, 2191];
    let artists = await Promise.all(
        artistIDs.map(async id => {
            const artist = await mainFetcher(`/people/${id}`);
            return artist;
        })
    )
        
    artists = artists.filter(Boolean);

    let latestShows = await mainFetcher("/productions/latest?page=0&size=10");
    latestShows = latestShows.content.map(show => ({
        id: show.id,
        title: show.title,
        image: getShowImage(show.mediaURL)
    }))

    return {
        props: { artists, latestShows }
    }
}

const useStyles = makeStyles(style)

function Home({ artists, latestShows }) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <VideoContainer production={data.productions} />
            <Hidden mdDown>
                <Divider className={classes.divider} flexItem />
            </Hidden>
                <ContentSlider title="Καλλιτέχνες" description="Δημοφιλείς Ηθοποιοί">
                    {artists.map((artist, index) => 
                        <ArtistCard 
                            id={artist.id}
                            fullName = {artist.fullName}
                            image = {artist.image}
                            key={index}
                            delay={index} />)}
                </ContentSlider>
            <Hidden mdDown>
                <Divider className={classes.divider} flexItem />
            </Hidden>
                <ContentSlider title="Νέες Παραστάσεις">
                    {latestShows.map((item) => 
                        <ShowCard 
                            id={item.id}
                            title={item.title}
                            media={item.image}
                            key={item.id} 
                        />)}
                </ContentSlider>
            <Hidden mdDown>
                    <Divider className={classes.divider} flexItem />
            </Hidden>
        </div>
    )
}

export default Home;