import { makeStyles, Hidden, Divider } from "@material-ui/core"
import style from "../src/assets/jss/layouts/homeStyle"
import ContentSlider from "../src/components/ContentSlider"
import ArtistCard from "../src/components/ArtistCard"
import data from "../src/mockData"
import VideoContainer from "../src/components/VideoContainer"
import ShowCard from "../src/components/ShowCard"
import { mainFetcher } from "../src/utils/AxiosInstances"
import getShowImage from "../src/utils/getShowImage"
import Head from "next/head"

export const getStaticProps = async () => {
    const artistIDs = [2189, 2634, 3218, 2939, 2192, 1931, 2755, 3171, 2039, 2027, 2754, 2026];
    let artists = await Promise.all(
        artistIDs.map(async id => {
            const artist = await mainFetcher(`/people/${id}`);
            return artist;
        })
    )

    artists = artists.filter(Boolean);

    const showIDs = [293, 272, 246, 292, 410, 381, 404, 345, 308, 322, 297, 258, 263]

    let latestShows = await Promise.all(
        showIDs.map(async id => {
            const show = await mainFetcher(`/productions/${id}`);
            return show
        })
    )

    latestShows = latestShows.map(show => ({
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
        <>
            <Head>
                <title>Theatrica</title>
            </Head>
            <div className={classes.wrapper}>
                <div className={classes.container}>
                    <section>
                        <VideoContainer production={data.productions} />
                    </section>
                    <Hidden smDown>
                        <Divider className={classes.divider} flexItem />
                    </Hidden>
                    <section>
                        <ContentSlider title="Καλλιτέχνες" description="Δημοφιλείς Ηθοποιοί">
                            {artists.map((artist, index) =>
                                <ArtistCard
                                    id={artist.id}
                                    fullName={artist.fullName}
                                    image={artist.image}
                                    key={index}
                                    delay={index} />)}
                        </ContentSlider>
                    </section>
                    <Hidden smDown>
                        <Divider className={classes.divider} flexItem />
                    </Hidden>
                    <section>
                        <ContentSlider title="Παραστάσεις" description="Νέες Κυκλοφορίες">
                            {latestShows.map((item) =>
                                <ShowCard
                                    id={item.id}
                                    title={item.title}
                                    media={item.image}
                                    key={item.id}
                                />)}
                        </ContentSlider>
                    </section>
                </div>
            </div>
        </>

    )
}

export default Home;