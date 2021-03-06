import { makeStyles, Typography, TextField, Slider, Button, InputAdornment, Switch, FormControlLabel, Radio } from "@material-ui/core";
import style from "../src/assets/jss/layouts/findStyle"
import { useReducer, useEffect, useState, useRef } from "react";
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Script from "next/script"
import { useRouter } from "next/router"
import events from "../public/eventsVeryNew.json"
import { mainFetcher } from "../src/utils/AxiosInstances"
import EventsCard from "../src/components/EventsCard"
import { Pagination } from '@material-ui/lab';
import Head from "next/head"

let sessionToken;
const date = new Date();

function handleScriptLoad(setService) {
  sessionToken = new google.maps.places.AutocompleteSessionToken();
  const autocompleteService = new google.maps.places.AutocompleteService();
  setService(autocompleteService);
}

const useStyles = makeStyles(style);

const initialFormData = {
  address: '',
  dateStart: date.toISOString().split('T')[0],
  dateEnd: '',
  maxDistance: 5
}

const initialErrorData = {
  address: '',
  dateStart: '',
  dateEnd: ''
}

const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value
  }
}

export const getServerSideProps = async ({ query }) => {

  let filteredEvents = [];
  let filteredVenues = [];

  if (query.dateStart) {
    const dateStart = new Date(query.dateStart)

    if (query.dateEnd) {
      const dateEnd = new Date(query.dateEnd)
      dateEnd.setUTCHours(23, 59, 59, 999)
      filteredEvents = events.filter(event => {
        const eventDate = new Date(event.DateEvent)
        if (eventDate > dateStart && eventDate < dateEnd) {
          return true;
        }
      })
    } else {
      filteredEvents = events.filter(event => {
        const eventDate = new Date(event.DateEvent)
        if (eventDate.getDate() === dateStart.getDate() &&
          eventDate.getMonth() === dateStart.getMonth() &&
          eventDate.getFullYear() === dateStart.getFullYear()) {
          return true;
        }
      })
    }

    const venueIDs = [...new Set(filteredEvents.map(event => event.VenueID))];

    filteredVenues = await Promise.all(venueIDs.map(async id => {
      const venue = await mainFetcher(`/venues/${id}`)
      return venue
    }))

    if (query.address && query.maxDistance) {
      const maxDistance = query.maxDistance * 1000;

      filteredVenues = await Promise.all(filteredVenues.map(async venue => {
        if (venue.id === 81) {
          return venue
        }
        const URI = encodeURI(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${query.address}&destinations=${venue.title}&region=gr&key=${process.env.DISTANCE_MATRIX_API}`)
        const response = await fetch(URI)
        const distance = await response.json()

        if (distance.rows[0].elements[0].distance.value <= maxDistance) {
          return venue
        }
      }))

      filteredVenues = filteredVenues.filter(venue => venue)
      const filteredVenueIDs = filteredVenues.map(venue => venue.id)

      filteredEvents = filteredEvents.filter(event => {
        if (filteredVenueIDs.includes(Number(event.VenueID))) {
          return true
        }
      })
    }
  }

  const productionIDs = [...new Set(filteredEvents.map(event => event.ProductionID))]
  const productions = await Promise.all(productionIDs.map(async id => {
    const production = await mainFetcher(`/productions/${id}`)
    return production
  }))

  const shows = productions.map(production => {
    let eventsFinal = filteredEvents.filter(event => Number(event.ProductionID) === production.id)
    eventsFinal = eventsFinal.map(event => {
      const venue = filteredVenues.find(venue => Number(event.VenueID) === venue.id)
      return {
        date: event.DateEvent,
        venue,
        price: event.PriceRange
      }
    })
    return {
      id: production.id,
      title: production.title,
      duration: production.duration,
      events: eventsFinal,
      url: production.url
    }
  })

  return {
    props: {
      shows
    }
  }
}

const FindShow = ({ shows }) => {
  const classes = useStyles();

  const router = useRouter();

  const [autocompleteService, setAutocompleteService] = useState(null)
  const [predictions, setPredictions] = useState([])

  const [checked, setChecked] = useState(true)
  const [radioState, setRadioState] = useState('a')

  const [formData, dispatch] = useReducer(reducer, initialFormData)
  const [errorText, dispatchError] = useReducer(reducer, initialErrorData)

  const scrollRef = useRef(null)
  const [page, setPage] = useState(1);

  const handleChange = (event) => {
    dispatch({ field: event.target.id, value: event.target.value })
    dispatchError({ field: event.target.id, value: "" })
  }

  const handleSliderChange = (event, newValue) => {
    dispatch({ field: "maxDistance", value: newValue })
  }

  const handlePlaceSelect = (event, newValue) => {
    dispatch({ field: "address", value: newValue })
  }

  const handleRadioChange = event => {
    setRadioState(event.target.value);
  };

  const handlePagination = (event, value) => {
    setPage(value);
    scrollRef.current.scrollIntoView();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const query = '';
    if (validateForm()) {
      query += `dateStart=${formData.dateStart}`
      if (radioState === 'b') {
        query += `&dateEnd=${formData.dateEnd}`
      }
      if (checked) {
        query += `&address=${formData.address}&maxDistance=${formData.maxDistance}`
      }
      router.push(`/find?${query}`)
      setPage(1)
    }
  }

  const validateForm = () => {
    let dataValid = true;
    if (!formData.dateStart) {
      dispatchError({ field: "dateStart", value: "???????????????? ????????????????????!" })
      dataValid = false;
    }
    if (radioState === 'b' && !formData.dateEnd) {
      dispatchError({ field: "dateEnd", value: "???????????????? ????????????????????!" })
      dataValid = false;
    }
    if (checked && !formData.address) {
      dispatchError({ field: "address", value: "?????????????????????? ?????? ?????????????????? ??????!" })
      dataValid = false;
    }
    return dataValid;
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (autocompleteService && (typeof sessionToken !== "undefined")) {
        autocompleteService.getPlacePredictions({
          input: formData.address,
          sessionToken: sessionToken,
          componentRestrictions: {
            country: 'gr'
          }
        },
          (predictions, status) => { setPredictions(predictions) });
      }
    }, 500)
    return () => {
      clearTimeout(debounce)
    }
  }, [autocompleteService, formData.address])

  return (
    <>
      <Head>
        <title>???????????? ???????????????????? | Theatrica</title>
      </Head>
      <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_JAVASCRIPT_API}&libraries=places`} onLoad={() => handleScriptLoad(setAutocompleteService)} />
      <div className="pageWrapper">
        <div className="pageContent">
          <Typography variant="h3" component="h1" className={classes.underlineDecoration}>???????? ?????? ??????????????????</Typography>
          <form id="searchForm" onSubmit={handleSubmit} className={classes.form}>
            <div>
              <div className={classes.radioButtons}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={radioState === 'a'}
                      value='a'
                      onChange={handleRadioChange}
                    />
                  }
                  label="???????????????????????? ????????????????????"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={radioState === 'b'}
                      value='b'
                      onChange={handleRadioChange}
                    />
                  }
                  label="?????????? ??????????????????????"
                />
              </div>
              <div className={classes.formDates}>
                <TextField color="secondary"
                  id="dateStart"
                  label={radioState === 'a' ? "????????????????????" : "??????:"}
                  type="date"
                  value={formData.dateStart}
                  error={errorText.dateStart ? true : false}
                  helperText={errorText.dateStart}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField color="secondary"
                  id="dateEnd"
                  label="??????:"
                  type="date"
                  value={formData.dateEnd}
                  error={(radioState === 'b') && errorText.dateEnd ? true : false}
                  helperText={radioState === 'b' && errorText.dateEnd}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={radioState === 'a'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
            <div className={classes.addressWrapper}>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={() => { setChecked(prev => !prev) }}
                    color="secondary" />
                }
                label="?????????????????????? ??????????????????"
                labelPlacement="end"
              />
              <Autocomplete
                freeSolo
                id="address"
                onChange={handlePlaceSelect}
                value={formData.address}
                fullWidth
                disabled={!checked}
                options={predictions ? predictions.map(place => place.description) : []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="??????????????????:"
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    error={checked && errorText.address ? true : false}
                    helperText={checked && errorText.address}
                    onChange={handleChange}
                    InputProps={{
                      ...params.InputProps, type: 'search', startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <div className={classes.sliderWrapper}>
                <Typography gutterBottom>
                  <b>?????????????? ????????????????: </b> {formData.maxDistance} ????????????????????
                </Typography>
                <Slider
                  id="maxDistance"
                  color="secondary"
                  valueLabelDisplay="auto"
                  min={5}
                  value={formData.maxDistance}
                  onChange={handleSliderChange}
                  className={classes.slider}
                  disabled={!checked}
                  classes={{
                    valueLabel: classes.sliderLabel
                  }}
                />
              </div>
            </div>
            <Button
              ref={scrollRef}
              type="submit"
              variant="outlined"
              startIcon={<SearchIcon fontSize="large" />}
              className={classes.button}>
              ??????????????????
            </Button>
          </form>
          {router.query.dateStart &&
            <div className={classes.resultsWrapper}>
              <Typography variant="h3" component="h1" className={classes.underlineDecoration}>????????????????????????</Typography>
              <div className={classes.resultsContainer}>
                {shows.length > 0 ?
                  <>
                  {shows.slice((page - 1) * 5, page * 5).map(show => 
                    <EventsCard key={show.id} show={show} />
                  )}
                  {shows.length > 5 &&
                    <Pagination 
                        count={Math.ceil(shows.length / 5)} 
                        page={page} 
                        color="secondary"
                        style={{alignSelf: "center"}}
                        onChange={handlePagination}
                    />
                  }
                  </> :
                  <Typography variant="body1">?????? ???????????????? ??????????????????????!</Typography>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default FindShow;

