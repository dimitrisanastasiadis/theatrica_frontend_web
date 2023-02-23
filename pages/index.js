import {
  makeStyles,
  Hidden,
  Divider,
  Typography,
  InputBase,
} from "@material-ui/core";
import style from "../src/assets/jss/layouts/homeStyle";
import ContentSlider from "../src/components/ContentSlider";
import ArtistCard from "../src/components/ArtistCard";
import ShowCard from "../src/components/ShowCard";
import { mainFetcher } from "../src/utils/AxiosInstances";
import getShowImage from "../src/utils/getShowImage";
import Head from "next/head";
import NewsCard from "../src/components/NewsCard";
import { v2 as cloudinary } from "cloudinary";
import { newsFetcher } from "../src/utils/AxiosInstances";
import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import ScrollPrompt from "../src/components/ScrollPrompt";
import HeroGraph from "../src/components/HeroGraph";

export const getStaticProps = async () => {
  cloudinary.config({
    cloud_name: "dpddl5vyr",
    secure: true,
  });

  const articlesResponse = await newsFetcher(
    encodeURI("/everything?q=παράσταση θέατρο&sortBy=publishedAt&pageSize=3")
  );
  const articles = articlesResponse?.articles;

  articles.forEach((article) => {
    article.urlToImage = cloudinary.url(encodeURI(article.urlToImage), {
      type: "fetch",
      width: 320,
      fetch_format: "auto",
      crop: "scale",
      quality: "auto",
    });
  });

  const artistIDs = [
    5555, 6846, 4770, 4791, 8158, 5047, 5233, 5428, 4691, 5192, 4962, 6643,
    4659, 6104,
  ];
  let artists = await Promise.all(
    artistIDs.map(async (id) => {
      const artist = await mainFetcher(`/people/${id}`);
      return artist;
    })
  );

  artists = artists.filter(Boolean);

  let latestShows = await mainFetcher(`/productions/latest?page=0&size=10`);

  latestShows = latestShows?.content?.map((show) => ({
    id: show.id,
    title: show.title,
    image: getShowImage(show.mediaURL),
  }));

  return {
    props: { artists, latestShows, articles },
    revalidate: 60 * 15,
  };
};

const useStyles = makeStyles(style);

function Home({ artists, latestShows, articles }) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue) router.push(`/results?search_query=${searchValue}`);
  };

  return (
    <>
      <Head>
        <title>Theatrica</title>
        <meta
          name="description"
          content="Αναζητήστε καλλιτέχνες, παραστάσεις και θέατρα, δείτε στατιστικά και συγκρίνετε χρονικές περιόδους ή βρείτε μια παράσταση στην περιοχή σας!"
        />
      </Head>
      <div className={classes.heroBackgroundWrapper}>
        <div className={classes.heroBackground}>
          <HeroGraph />
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.heroSection}>
            <Typography variant="h1" style={{ marginTop: "auto" }}>
              Theatrical Analytics
            </Typography>
            <Typography variant="body2">
              Αναζητήστε καλλιτέχνες, παραστάσεις και θέατρα, δείτε στατιστικά
              και συγκρίνετε χρονικές περιόδους ή βρείτε μια παράσταση στην
              περιοχή σας!
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className={classes.searchInput}>
                <SearchIcon />
                <InputBase
                  type="text"
                  placeholder="Αναζήτηση..."
                  value={searchValue}
                  onChange={handleChange}
                />
              </div>
            </form>
            <div className={classes.scrollPromptContainer}>
              <ScrollPrompt />
            </div>
          </div>
          <section>
            <Typography
              className={classes.headingPadding}
              variant="h3"
              component="h2"
            >
              Νεότερες Ειδήσεις
            </Typography>
            <div className={classes.newsContainer}>
              {articles.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))}
            </div>
          </section>
          <Hidden smDown>
            <Divider className={classes.divider} flexItem />
          </Hidden>
          <section>
            <ContentSlider
              title="Καλλιτέχνες"
              description="Δημοφιλείς Ηθοποιοί"
            >
              {artists.map((artist, index) => (
                <ArtistCard
                  id={artist.id}
                  fullName={artist.fullName}
                  image={artist.image}
                  key={index}
                  delay={index}
                />
              ))}
            </ContentSlider>
          </section>
          <Hidden smDown>
            <Divider className={classes.divider} flexItem />
          </Hidden>
          <section>
            <ContentSlider title="Παραστάσεις" description="Νέες Κυκλοφορίες">
              {latestShows.map((item) => (
                <ShowCard
                  id={item.id}
                  title={item.title}
                  media={item.image}
                  key={item.id}
                />
              ))}
            </ContentSlider>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
