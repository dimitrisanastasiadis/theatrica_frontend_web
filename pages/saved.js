import { makeStyles, Typography, Divider } from "@material-ui/core"
import style from "../src/assets/jss/layouts/savedPageStyle";
import { useEffect, useReducer, useState } from "react";
import FetchComponent from "../src/components/FetchComponent";
import { useRouter } from "next/router";
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import Head from "next/head"

const useStyles = makeStyles(style)

const Category = ({ ids, title, path, id }) => {
  const classes = useStyles();
  const router = useRouter();
  const [slicedIds, setSlicedIds] = useState([])

  const handleClick = () => {
    if (id === 1) {
      router.push(`/saved?showMore=watchlist`)
    } else if (id === 2) {
      router.push(`/saved?showMore=favoriteArtists`)
    } else if (id === 3) {
      router.push(`/saved?showMore=favoriteShows`)
    } else if (id === 4) {
      router.push(`/saved?showMore=favoriteVenues`)
    }
  }

  useEffect(() => {
    if (!router.query.showMore) {
      const newIds = ids.slice(0, 4)
      setSlicedIds(newIds)
    } else {
      setSlicedIds(ids)
    }
  }, [ids, router.query.showMore])

  return (
    <>
      <Head>
        <title>Αποθηκευμένα | Theatrica</title>
      </Head>
      {slicedIds.length > 0 &&
        <div className={classes.container}>
          <Typography variant="h3" component="h2">{title}</Typography>
          <div className={classes.items}>
            {slicedIds.map(id =>
              <FetchComponent key={id} path={path} id={id} />
            )}
          </div>
          {!router.query.showMore &&
            <>
              <Divider className={classes.divider} />
              <Typography className={classes.link} variant="body2" onClick={handleClick}>Δείτε περισσότερα...</Typography>
            </>
          }
        </div>
      }
    </>
  )
}

const initialState = {
  watchlist: {
    id: 1,
    title: "Watchlist",
    ids: [],
    path: "productions"
  },
  favoriteArtists: {
    id: 2,
    title: "Αγαπημένοι Καλλιτέχνες",
    ids: [],
    path: "people"
  },
  favoriteShows: {
    id: 3,
    title: "Αγαπημένες Παραστάσεις",
    ids: [],
    path: "productions"
  },
  favoriteVenues: {
    id: 4,
    title: "Αγαπημένα Θέατρα",
    ids: [],
    path: "venues"
  }
}

const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: {
      ...state[field],
      ids: value
    }
  }
}

const SavedPage = () => {
  const router = useRouter()

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (localStorage.getItem("favoriteArtists") !== null) {
      dispatch({ field: "favoriteArtists", value: JSON.parse(localStorage.getItem("favoriteArtists")) })
    }
    if (localStorage.getItem("favoriteShows") !== null) {
      dispatch({ field: "favoriteShows", value: JSON.parse(localStorage.getItem("favoriteShows")) })
    }
    if (localStorage.getItem("favoriteVenues") !== null) {
      dispatch({ field: "favoriteVenues", value: JSON.parse(localStorage.getItem("favoriteVenues")) })
    }
    if (localStorage.getItem("watchlist") !== null) {
      dispatch({ field: "watchlist", value: JSON.parse(localStorage.getItem("watchlist")) })
    }
  }, [])

  return (
    <div className="pageWrapper">
      <div className="pageContent">
        <Typography variant="h2" component="h1">Αποθηκευμένα <BookmarksIcon /></Typography>
        {(state.watchlist.ids.length > 0 || state.favoriteArtists.ids.length > 0 || state.favoriteShows.ids.length > 0 || state.favoriteVenues.ids.length > 0) ?
          <>
            {router.query.showMore ?
              <Category id={state[router.query.showMore].id} ids={state[router.query.showMore].ids} title={state[router.query.showMore].title} path={state[router.query.showMore].path} /> :
              [state.watchlist, state.favoriteArtists, state.favoriteShows, state.favoriteVenues].map(cat =>
                <Category key={cat.id} id={cat.id} ids={cat.ids} title={cat.title} path={cat.path} />
              )}
          </> :
          <Typography varianth="body1" style={{marginTop: "2em"}}>Δεν έχετε προσθέσει κάτι στα αποθηκευμένα σας!</Typography>
        }
      </div>
    </div>
  );
}

export default SavedPage;