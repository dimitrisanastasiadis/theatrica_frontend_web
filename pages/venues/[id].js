import { makeStyles, Typography } from "@material-ui/core";
import style from "../../src/assets/jss/layouts/venueDetailsStyle";
import { mainFetcher } from "../../src/utils/AxiosInstances";
import { useRouter } from "next/router";
import LoadingScene from "../../src/components/LoadingScene";
import Image from "next/image";
import ContentSlider from "../../src/components/ContentSlider";
import ShowCard from "../../src/components/ShowCard";
import PhoneIcon from '@material-ui/icons/Phone';
import Head from "next/head"

export const getStaticPaths = async () => {
  const venueIDs = [];
  const paths = venueIDs.map(id => ({
    params: { id: id.toString() }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const venue = await mainFetcher(`/venues/${params.id}`)

  if (!venue) {
    return {
      notFound: true
    }
  }

  let productions = await mainFetcher(`/venues/${params.id}/productions`);
  productions = productions.content;

  const URI = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${venue.title}&region=gr&key=${process.env.GEOCODING_API}&language=el`)
  const response = await fetch(URI)
  let location = await response.json()

  location = location.results[0] || null

  return {
    props: { venue, productions, location },
    revalidate: 900
  }
}

const useStyles = makeStyles(style);

function VenueDetails({ venue, productions, location }) {
  const classes = useStyles();
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingScene fullScreen />
  }

  return (
    <>
      <Head>
        <title>{venue.title} | Theatrica</title>
      </Head>
      <div className={`pageWrapper ${classes.pageWrapper}`}>
        <div className={classes.imageGridWrapper}>
          <div className={classes.imageGrid}>
            <div className={classes.imageBlur}>
              <Image src="/TheaterImage.jpg" alt="Header image" layout="fill" />
            </div>
            <Image src="/TheaterImage.jpg" alt="Header image" width={575} height={420} />
            <div className={classes.imageBlur}>
              <Image src="/TheaterImage.jpg" alt="Header image" layout="fill" />
            </div>
          </div>
        </div>
        <div className={`pageContent ${classes.content}`} style={{ maxWidth: 1250 }}>
          <div style={{ marginTop: -100, marginBottom: "5em" }}>
            <Typography variant="h2" component="h1">{venue.title}</Typography>
            {location &&
              <Typography variant="body2" component="h2">{`${location.address_components[1].long_name} ${location.address_components[0].long_name}, ${location.address_components[2].long_name}`}</Typography>
            }
          </div>
          <section>
            <Typography className={classes.sectionTitle} variant="h3">Πληροφορίες</Typography>
            <Typography className={classes.paragraph} variant="body1">Το θέατρο βρίσκεται στην περιοχή του «Ψυρρή», επί της οδού Σαρρή. Η περιοχή πήρε το όνομά της από το παρατσούκλι του φερώνυμου καταπατητή της παλιάς Αθήνας και αποτελούσε κέντρο συγκέντρωσης βιοτεχνικών μονάδων κατά την περίοδο 1950 – 1970.</Typography>
            <Typography className={classes.paragraph} variant="body1">Η περιοχή του «Ψυρρή», είναι ένα κλασικό παράδειγμα ανάπλασης, στο πλαίσιο της λογικής που συνδέει την ανάπτυξη κέντρων διασκέδασης, εστιατορίων και χώρων πολιτισμού, όπου ξεκίνησε στις αρχές της δεκαετίας του ’90 και περνώντας μέσα από τη διεξαγωγή των Ολυμπιακών Αγώνων συνεχίζεται μέχρι σήμερα, όχι μόνο στην περιοχή του «Ψυρρή», αλλά και στην ευρύτερη περιοχή του λεγόμενου ιστορικού κέντρου της πόλης.</Typography>
            <Typography className={classes.paragraph} variant="body1">Θεατρικοί χώροι, αίθουσες τέχνης, εστιατόρια, καφενεία και μπαράκια ήρθαν να εγκατασταθούν στους δρόμους της περιοχής του «Ψυρρή» αντικαθιστώντας παλιά σπίτια και βιοτεχνικές μονάδες.</Typography>
          </section>
          <section>
            <ContentSlider title="Παραστάσεις" decoratedTitle>
              {productions.map((item) =>
                <ShowCard
                  id={item.id}
                  title={item.title}
                  media={item.mediaURL}
                  key={item.id}
                />
              )}
            </ContentSlider>
          </section>
          {location &&
            <section>
              <Typography className={classes.sectionTitle} variant="h3">Χάρτης</Typography>
              <iframe
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?q=place_id:${location.place_id}&key=${process.env.NEXT_PUBLIC_MAPS_EMBED_API}`}  
              />
            </section>
          }
          <section>
            <Typography variant="h3" className={classes.sectionTitle}>Επικοινωνία</Typography>
            <div className={classes.socialContainer}>
              <a href="https://www.facebook.com" className={`linksNoDecoration ${classes.social}`}>
                <div className={classes.socialLogo}>
                  <Image src="/FacebookLogo.svg" width={32} height={32} alt="Facebook Logo" />
                </div>
                <Typography variant="body1">Facebook</Typography>
              </a>
              <a href="https://www.instagram.com" className={`linksNoDecoration ${classes.social}`}>
                <div className={classes.socialLogo}>
                  <Image src="/InstagramLogo.svg" width={32} height={32} alt="Instagram Logo" />
                </div>
                <Typography variant="body1">Instagram</Typography>
              </a>
              <div className={`linksNoDecoration ${classes.social}`}>
                <div className={classes.socialLogo}>
                  <PhoneIcon fontSize="large" />
                </div>
                <Typography variant="body1">211 000 0000</Typography>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>

  )
}

export default VenueDetails;