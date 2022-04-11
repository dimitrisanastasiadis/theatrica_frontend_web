import PaginationPage from "../../src/components/PaginationPage";
import { mainFetcher } from "../../src/utils/AxiosInstances";
import Head from "next/head"
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { makeStyles, Hidden, Drawer, Fab, Button } from "@material-ui/core";
import style from "../../src/assets/jss/layouts/artistsPageStyle";
import FilterListIcon from '@material-ui/icons/FilterList';

export const getServerSideProps = async ({ query }) => {
  if (!query.page) {
    return {
      redirect: {
        destination: '/artists?page=1',
        permanent: false,
      },
    }
  }

  let data

  const page = Number(query.page)

  if (query.letter) {
    data = await mainFetcher(encodeURI(`/people/letter?value=${query.letter}&page=${page - 1}&size=12`))
  } else if (query.role) {
    data = await mainFetcher(encodeURI(`/people/role?value=${query.role}&page=${page - 1}&size=12`))
  } else {
    data = await mainFetcher(`/people?page=${page - 1}&size=12`);
  }


  if (!data.content.length) {
    return {
      notFound: true
    }
  }

  const artists = data.content;
  const pageCount = data.totalPages;

  return {
    props: {
      artists,
      pageCount,
      page
    }
  }
}

const useStyles = makeStyles(style)

const letters = [...'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ']
const roles = ['Ηθοποιός', 'Παίζουν', 'Σκηνοθεσία', 'Βοηθός σκηνοθέτη', 'Φωτισμοί', 'Φωτογραφίες', 'Μουσική', 'Παραγωγή', 'Μετάφραση', 'Σκηνικά', 'Κοστούμια', 'Ερμηνεύουν', 'Κείμενο', 'Ηθοποιοί', 'Μουσική επιμέλεια', 'Συγγραφέας', 'Επικοινωνία', 'Πρωταγωνιστούν', 'Σχεδιασμός Φωτισμών', 'Χορογραφίες', 'Επιμέλεια Κίνησης', 'Παίζουν οι ηθοποιοί', 'Οργάνωση παραγωγής', 'Σκηνικά-Κοστούμια', 'Ερμηνεία']

const ArtistsPagination = ({ artists, pageCount, page }) => {
  const classes = useStyles()
  const router = useRouter()
  const [letterValue, setLetterValue] = useState(router.query.letter);
  const [roleValue, setRoleValue] = useState(router.query.role);
  const [drawer, setDrawer] = useState(false)

  const handleClear = () => {
    router.push({
      pathname: '/artists',
      query: {
        page: 1
      }
    })
    setDrawer(false)
  }

  useEffect(() => {
    if (letterValue) {
      router.push({
        pathname: '/artists',
        query: {
          page: 1,
          letter: letterValue
        }
      })
      setDrawer(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letterValue])

  useEffect(() => {
    if (roleValue) {
      router.push({
        pathname: '/artists',
        query: {
          page: 1,
          role: roleValue
        }
      })
      setDrawer(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleValue])

  const Filters =
    <div className={classes.filtersContainer}>
      <Typography variant="h3" style={{ marginBottom: 30 }}>Φίλτρα</Typography>
      <Autocomplete
        value={letterValue}
        onChange={(event, newValue) => {
          setLetterValue(newValue);
        }}
        id="controllable-states-demo"
        options={letters}
        style={{ width: 200 }}
        renderInput={(params) => <TextField color="secondary" {...params} label="Αρχικό Γράμμα" variant="outlined" />}
      />
      <Autocomplete
        value={roleValue}
        onChange={(event, newValue) => {
          setRoleValue(newValue);
        }}
        id="controllable-states-demo"
        options={roles}
        style={{ width: 200 }}
        renderInput={(params) => <TextField color="secondary" {...params} label="Επάγγελμα" variant="outlined" />}
      />
      <Button color="secondary" onClick={handleClear}>ΚΑΘΑΡΙΣΜΟΣ</Button>
    </div>

  return (
    <>
      <Head>
        <title>Καλλιτέχνες | Theatrica</title>
      </Head>
      <Hidden mdUp>
        <div className={classes.fab}>
          <Fab color="secondary" onClick={() => setDrawer(true)}>
            <FilterListIcon />
          </Fab>
        </div>
        <Drawer classes={{ paper: classes.drawer }} anchor="left" open={drawer} onClose={() => setDrawer(false)}>
          {Filters}
        </Drawer>
      </Hidden>
      <div className={classes.artistsContainer}>
        <Hidden smDown>
          {Filters}
        </Hidden>
        <PaginationPage title="Καλλιτέχνες" items={artists} pageCount={pageCount} page={page} path="/artists" />
      </div>

    </>
  );
}

export default ArtistsPagination;