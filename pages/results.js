import { makeStyles, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Paper } from "@material-ui/core"
import style from "../src/assets/jss/layouts/resultsPageStyle"
import { useEffect, useState, useRef } from "react"
import algoliasearch from 'algoliasearch';
import { InstantSearch, connectSearchBox, Configure, Index, connectHits, connectStateResults } from "react-instantsearch-dom"
import { useRouter } from "next/router"
import Link from "next/link"
import { Pagination } from '@material-ui/lab';
import Head from "next/head"

const useStyles = makeStyles(style)

const searchClient = algoliasearch(
  'T3UJ0QPIR6',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API
);

const VirtualSearchBox = connectSearchBox(() => null);

const ResultsPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const [isSearching, setIsSearching] = useState(true);

  const [artistsHits, setArtistsHits] = useState(0);
  const [productionsHits, setProductionsHits] = useState(0);
  const [venuesHits, setVenuesHits] = useState(0);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hitsPerPage, setHitsPerPage] = useState(5);

  const scrollRef = useRef(null)

  const handlePagination = (event, value) => {
    setPage(value);
    scrollRef.current.scrollIntoView();
  }

  useEffect(() => {
    if (router.query.sm) {
      if (router.query.sm !== 'a' && router.query.sm !== 'p' && router.query.sm !== 'v') {
        router.push(`/results?search_query=${router.query.search_query}`)
      }
      setHitsPerPage(20)
    } else {
      setHitsPerPage(5)
    }
  }, [router.query.sm, router.query.search_query, router])

  return (
    <>
      <Head>
        <title>Αναζήτηση | Theatrica</title>
      </Head>
      <div className="pageWrapper">
        <div className="pageContent">
          <Typography ref={scrollRef} className={classes.title} variant="h4" component="h1">Αποτελέσματα για <b>{`"${router.query.search_query}"`}</b></Typography>
          <InstantSearch
            searchClient={searchClient}
            indexName="root"
            searchState={{
              query: router.query.search_query
            }}
          >
            <Configure
              hitsPerPage={hitsPerPage}
              page={page - 1}
            />
            <VirtualSearchBox />
            {(!router.query.sm || router.query.sm === "a") &&
              <div className={classes.hitsContainer}>
                <Index indexName="Artists">
                  <CustomHits path="artists" title="Καλλιτέχνες" />
                  {
                    artistsHits > 5 && !router.query.sm &&
                    <Link href={`/results?search_query=${router.query.search_query}&sm=a`}>
                      <a className={classes.linkMore}>
                        <Typography variant="body2">Περισσότερα Αποτελέσματα Καλλιτεχνών</Typography>
                      </a>
                    </Link>
                  }
                </Index>
              </div>
            }
            {(!router.query.sm || router.query.sm === "v") &&
              <div className={classes.hitsContainer}>
                <Index indexName="Venues">
                  <CustomHits path="venues" title="Θεατρικοί Χώροι" />
                  {
                    venuesHits > 5 && !router.query.sm &&
                    <Link href={`/results?search_query=${router.query.search_query}&sm=v`}>
                      <a className={classes.linkMore}>
                        <Typography variant="body2">Περισσότερα Αποτελέσματα Θεατρικών Χώρων</Typography>
                      </a>
                    </Link>
                  }
                </Index>
              </div>
            }
            {(!router.query.sm || router.query.sm === "p") &&
              <div className={classes.hitsContainer}>
                <Index indexName="Productions">
                  <CustomHits path="shows" title="Παραστάσεις" />
                  {
                    productionsHits > 5 && !router.query.sm &&
                    <Link href={`/results?search_query=${router.query.search_query}&sm=p`}>
                      <a className={classes.linkMore}>
                        <Typography variant="body2">Περισσότερα Αποτελέσματα Παραστάσεων</Typography>
                      </a>
                    </Link>
                  }
                </Index>
              </div>
            }
            <CustomStateResults setArtistsHits={setArtistsHits} setProductionsHits={setProductionsHits} setVenuesHits={setVenuesHits} setTotalPages={setTotalPages} setIsSearching={setIsSearching} />
          </InstantSearch>
          {(artistsHits + productionsHits + venuesHits === 0 && !isSearching) &&
            <Typography variant="h5">Δεν βρέθηκαν αποτελέσματα</Typography>
          }
          {totalPages > 1 &&
            <Pagination
              className={classes.pagination}
              count={totalPages}
              page={page}
              color="secondary"
              onChange={handlePagination}
            />
          }
        </div>
      </div>
    </>

  );
}

const CustomHits = connectHits(({ hits, path, title }) => {
  const classes = useStyles();

  return (
    hits.length === 0 ? null :
      <>
        <Typography className={classes.underlineDecoration} variant="h5" component="h2">{title}</Typography>
        <TableContainer component={Paper} className={classes.hits}>
          <Table>
            <TableBody>
              {hits.map(hit => (
                <TableRow key={hit.objectID} className={classes.tableRow}>
                  <TableCell>
                    <Link href={`/${path}/${hit.ID}`}>
                      <a className={classes.link}>
                        <Typography variant="body1">{path === "artists" ? hit.Fullname : hit.Title}</Typography>
                      </a>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
  )
});

const CustomStateResults = connectStateResults(({ allSearchResults, setArtistsHits, setProductionsHits, setVenuesHits, setTotalPages, searching, setIsSearching }) => {
  const router = useRouter()

  useEffect(() => {
    if (allSearchResults?.Artists) {
      setArtistsHits(allSearchResults.Artists.nbHits)
    }
    if (allSearchResults?.Productions) {
      setProductionsHits(allSearchResults.Productions.nbHits)
    }
    if (allSearchResults?.Venues) {
      setVenuesHits(allSearchResults.Venues.nbHits)
    }
  }, [allSearchResults, setArtistsHits, setProductionsHits, setVenuesHits])

  useEffect(() => {
    if (router.query.sm === "a" && allSearchResults?.Artists)
      setTotalPages(allSearchResults.Artists.nbPages)
    else if (router.query.sm === "p" && allSearchResults?.Productions)
      setTotalPages(allSearchResults.Productions.nbPages)
    else if (router.query.sm === "v" && allSearchResults?.Venues)
      setTotalPages(allSearchResults.Venues.nbPages)
    else
      setTotalPages(0)
  }, [allSearchResults, router.query.sm, setTotalPages])

  useEffect(() => {
    setIsSearching(searching)
  }, [searching, setIsSearching])

  return null;
})

export default ResultsPage;