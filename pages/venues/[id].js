import { makeStyles, Typography } from "@material-ui/core";
import style from "../../src/assets/jss/layouts/venueDetailsStyle";
import { mainFetcher } from "../../src/utils/AxiosInstances";
import { useRouter } from "next/router";
import LoadingScene from "../../src/components/LoadingScene";
import Image from "next/image";
import ContentSlider from "../../src/components/ContentSlider";
import ShowCard from "../../src/components/ShowCard";

export const getStaticPaths = async () => {
  const venueIDs = [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93];
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

  return {
    props: { venue, productions }
  }
}

const useStyles = makeStyles(style);

function VenueDetails({ venue, productions }) {
  const classes = useStyles();
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingScene fullScreen />
  }

  console.log(productions[0].title)

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.imageGridWrapper}>
        <div className={classes.imageGrid}>
          <div className={classes.imageBlur}>
            <Image src="/TheaterImage.jpg" alt="Header image" width={575} height={420}/>
          </div>
          <Image src="/TheaterImage.jpg" alt="Header image" width={575} height={420}/>
          <div className={classes.imageBlur}>
            <Image src="/TheaterImage.jpg" alt="Header image" width={575} height={420}/>
          </div>
        </div>
      </div>
      <div className={classes.content}>
        <div style={{marginTop: -100, marginBottom: "5em"}}>
          <Typography variant="h2" component="h1">{venue.title}</Typography>
          <Typography variant="body2" component="h2">{venue.address}</Typography>
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
                  media={item.image}
                  key={item.id} 
              />
            )}
          </ContentSlider>
        </section>
      </div>
    </div>
  )
}

export default VenueDetails;