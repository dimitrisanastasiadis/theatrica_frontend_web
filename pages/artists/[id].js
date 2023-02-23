import React, { useMemo, useState } from "react";
import {
  makeStyles,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import style from "../../src/assets/jss/layouts/artistDetailsStyle";
import LoadingScene from "../../src/components/LoadingScene";
import { useRouter } from "next/router";
import { mainFetcher, tmdbFetcher } from "../../src/utils/AxiosInstances";
import Link from "next/link";
import Image from "next/image";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useFavoriteArtist from "../../src/hooks/useFavoriteArtist";
import MediaViewer from "../../src/components/MediaViewer";
import Head from "next/head";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";

const placeHolderBio =
  "Quisque tincidunt porta neque, vitae aliquet quam hendrerit id. Nulla facilisi. Sed hendrerit elit eu vulputate auctor. Mauris ac tincidunt dui. Suspendisse nec sagittis neque, et efficitur nisl. Proin molestie mollis tortor, id sodales risus. Phasellus mi ante, viverra vel euismod eget, vulputate vel libero. Curabitur sem tellus, posuere id est eu, auctor imperdiet mauris. Morbi euismod facilisis dolor, in vestibulum mauris mattis non. Donec sit amet tempor augue, a elementum nisl.";

const COLORS = [
  "#71FFFA",
  "#fff642",
  "#ed66ff",
  "#91ff55",
  "#fd2155",
  "#fff9f9",
];

export const getStaticPaths = async () => {
  const artists = await mainFetcher("/productions?page=0&size=10");

  const paths = artists.content.map((artist) => ({
    params: { id: artist.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const artist = await mainFetcher(`/people/${params.id}`);

  if (!artist) {
    return {
      notFound: true,
    };
  }

  const productions = await mainFetcher(`/people/${params.id}/productions`);

  const URI = encodeURI(`/search/person?query=${artist.fullName}`);
  const tmdbSearch = await tmdbFetcher(URI);
  const tmdbResults = tmdbSearch.results;
  tmdbResults.sort((a, b) => b.popularity - a.popularity);

  let images = [];

  if (tmdbResults.length > 0) {
    artist.image = `https://image.tmdb.org/t/p/w300${tmdbResults[0].profile_path}`;

    images = await tmdbFetcher(`/person/${tmdbResults[0].id}/images`);
    images = images.profiles;
    images = images.map((image) => {
      const imagePath = `https://image.tmdb.org/t/p/w300${image.file_path}`;
      return imagePath;
    });
    images = images.slice(0, 6);

    const details = await tmdbFetcher(`/person/${tmdbResults[0].id}`);

    if (details.birthday) {
      artist.birthday = details.birthday;
    }

    const translations = await tmdbFetcher(
      `/person/${tmdbResults[0].id}/translations`
    );

    if (translations.translations.length > 0) {
      translations.translations.forEach((translation) => {
        if (translation.english_name === "Greek") {
          artist.biography = translation.data.biography;
        }
      });
    }
  }

  const getProductionsByRole = (productions) => {
    let productionGroups = {};

    if (productions) {
      productionGroups = productions.content.reduce((r, a) => {
        r[a.role] = [...(r[a.role] || []), a];
        return r;
      }, {});
    }

    const {
      Ηθοποιός: actorsTemp,
      Ηθοποιοί: actorsTemp2,
      Παίζουν: actorsTemp3,
      Ερμηνεύουν: actorsTemp4,
      "Παίζουν οι": actorsTemp5,
      "Παίζουν αλφαβητικά": actorsTemp6,
      ...rest
    } = productionGroups;

    const acting = [
      ...(actorsTemp || []),
      ...(actorsTemp2 || []),
      ...(actorsTemp3 || []),
      ...(actorsTemp4 || []),
      ...(actorsTemp5 || []),
      ...(actorsTemp6 || []),
    ];

    return { acting, rest };
  };

  const getProductionsByRoleStats = (productionGroups) => {
    const productionsByRoleObject = {
      Ηθοποιός: productionGroups.acting,
      ...productionGroups.rest,
    };
    const productionsByRoleArray = Object.keys(productionsByRoleObject).map(
      (productionKey) => ({
        name: productionKey,
        value: productionsByRoleObject[productionKey].length,
      })
    );
    return productionsByRoleArray;
  };

  const productionGroups = getProductionsByRole(productions);
  const productionsByRole = getProductionsByRoleStats(productionGroups);

  return {
    props: {
      artist,
      productionGroups,
      productionsByRole,
      images,
    },
    revalidate: 900,
  };
};

const useStyles = makeStyles(style);

function ArtistDetails({
  artist,
  productionGroups,
  productionsByRole,
  images,
}) {
  const router = useRouter();
  const theme = useTheme();

  const classes = useStyles();
  const mdDown = useMediaQuery("(max-width:960px)");

  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const { isFavorite, setIsFavorite } = useFavoriteArtist(artist && artist.id);

  const stringBirthday = useMemo(() => {
    if (artist && artist.birthday) {
      return new Date(artist.birthday).toLocaleDateString("el", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    return "";
  }, [artist]);

  if (router.isFallback) {
    return <LoadingScene fullScreen />;
  }

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleImageClick = (event) => {
    setMediaIndex(Number(event.currentTarget.getAttribute("index")));
    setMediaViewerOpen(true);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Head>
        <title>{artist.fullName} | Theatrica</title>
      </Head>
      <div className={`pageWrapper ${classes.wrapper}`}>
        <div className={`pageContent ${classes.container}`}>
          <section className={classes.overview}>
            <Avatar
              alt="Artist Photo"
              variant="square"
              className={classes.avatar}
            >
              {artist.image ? (
                <Image
                  src={artist.image}
                  alt="Artist Photo"
                  width={300}
                  height={450}
                />
              ) : null}
            </Avatar>
            <Typography variant="h2" component="h1" className={classes.name}>
              {artist.fullName}
            </Typography>
            <IconButton
              size="small"
              className={classes.favoriteIcon}
              onClick={handleFavorite}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body1" className={classes.bio}>
              {artist.biography || placeHolderBio}
            </Typography>
            <Typography variant="body1" className={classes.birthday}>
              <strong>Ημερομηνία Γέννησης: </strong>
              {stringBirthday || "N/A"}
            </Typography>
          </section>
          <section>
            {mediaViewerOpen && (
              <MediaViewer
                media={images}
                currentImage={mediaIndex}
                setVisibility={setMediaViewerOpen}
              />
            )}
            <Typography
              variant="h4"
              component="h2"
              className={classes.sectionTitle}
            >
              Φωτογραφίες
            </Typography>
            <div className={classes.photographsContainer}>
              {images.length > 0 ? (
                <>
                  {images.map((url, index) => {
                    if ((mdDown && index < 4) || !mdDown) {
                      return (
                        <div
                          key={index}
                          index={index}
                          className={classes.photograph}
                          onClick={handleImageClick}
                        >
                          <Image
                            src={url}
                            alt={`${artist.fullName} profile picture`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      );
                    }
                  })}
                </>
              ) : (
                <Typography variant="body1">
                  Δεν υπάρχουν φωτογραφίες
                </Typography>
              )}
            </div>
          </section>
          <section>
            <Typography
              variant="h4"
              component="h3"
              className={classes.sectionTitle}
              style={{ marginBottom: 20 }}
            >
              Παραστάσεις
            </Typography>
            {productionGroups.acting.length > 0 && (
              <Accordion
                square
                expanded={expanded === "acting"}
                onChange={handleChange("acting")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="acting-content"
                  id="acting-header"
                >
                  <Typography variant="h5" component="h3">
                    Ηθοποιός
                  </Typography>
                </AccordionSummary>
                <List className={classes.list}>
                  {productionGroups.acting.map((play, index) => (
                    <ListItem key={index} className={classes.listItem}>
                      <Link href={`/shows/${play.productionId}`}>
                        <a className={classes.link}>
                          <ListItemText primary={play.title} />
                        </a>
                      </Link>
                      <Link href="/stats/2022">
                          <a style={{marginLeft: "auto"}} className={classes.link}>
                            <ListItemText
                              className={classes.year}
                              primary="2022"
                            />
                          </a>
                        </Link>
                    </ListItem>
                  ))}
                </List>
              </Accordion>
            )}
            {Object.entries(productionGroups.rest).map(
              ([key, value], index) => (
                <Accordion
                  square
                  key={index}
                  expanded={expanded === key}
                  onChange={handleChange(key)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${key}-content`}
                    id={`${key}-heading`}
                  >
                    <Typography variant="h5" component="h3">
                      {key}
                    </Typography>
                  </AccordionSummary>
                  <List className={classes.list}>
                    {value.map((play, index) => (
                      <ListItem key={index} className={classes.listItem}>
                        <Link href={`/shows/${play.productionId}`}>
                          <a className={classes.link}>
                            <ListItemText primary={play.title} />
                          </a>
                        </Link>
                        <Link href="/stats/2022">
                          <a style={{marginLeft: "auto"}} className={classes.link}>
                            <ListItemText
                              className={classes.year}
                              primary="2022"
                            />
                          </a>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Accordion>
              )
            )}
          </section>
          <section>
            <Typography
              variant="h4"
              component="h2"
              className={classes.sectionTitle}
            >
              Παραγωγές ανά Ρόλο
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={productionsByRole} dataKey="value">
                  {productionsByRole.map((prod, index) => (
                    <Cell
                      key={prod.name}
                      fill={COLORS[index]}
                      stroke={theme.palette.background.default}
                      strokeWidth={2}
                    />
                  ))}
                  <Cell
                    fill="#fd2155"
                    stroke={theme.palette.background.default}
                    strokeWidth={2}
                  />
                  <LabelList dataKey="value" strokeWidth={0} fill="#000" />
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#373737", border: 0 }}
                  itemStyle={{ color: "#fff" }}
                  formatter={(value) => `${value} παραγωγές`}
                />
                <Legend verticalAlign="top" wrapperStyle={{ bottom: 0 }} />
              </PieChart>
            </ResponsiveContainer>
          </section>
          <section>
            <Typography
              variant="h4"
              component="h2"
              className={classes.sectionTitle}
            >
              Social
            </Typography>
            <div className={classes.socialContainer}>
              <a
                href="https://www.twitter.com"
                className={`linksNoDecoration ${classes.social}`}
              >
                <div className={classes.socialLogo}>
                  <Image
                    src="/TwitterLogo.svg"
                    width={32}
                    height={32}
                    alt="Twitter Logo"
                  />
                </div>
                <Typography variant="body1">Twitter</Typography>
              </a>
              <a
                href="https://www.facebook.com"
                className={`linksNoDecoration ${classes.social}`}
              >
                <div className={classes.socialLogo}>
                  <Image
                    src="/FacebookLogo.svg"
                    width={32}
                    height={32}
                    alt="Facebook Logo"
                  />
                </div>
                <Typography variant="body1">Facebook</Typography>
              </a>
              <a
                href="https://www.instagram.com"
                className={`linksNoDecoration ${classes.social}`}
              >
                <div className={classes.socialLogo}>
                  <Image
                    src="/InstagramLogo.svg"
                    width={32}
                    height={32}
                    alt="Instagram Logo"
                  />
                </div>
                <Typography variant="body1">Instagram</Typography>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ArtistDetails;
