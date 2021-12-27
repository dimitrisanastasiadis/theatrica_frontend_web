import { makeStyles, Typography, TextField, Slider, Button, InputAdornment, Switch, FormControlLabel, Radio } from "@material-ui/core";
import style from "../src/assets/jss/layouts/findStyle"
import { useReducer, useEffect, useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { FaCalendarAlt } from 'react-icons/fa'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Script from "next/script"
import { useRouter } from "next/router"
import events from "../public/events.json"
import { mainFetcher } from "../src/utils/AxiosInstances"

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

    if (query.address && query.maxDistance) {
      const maxDistance = query.maxDistance * 1000;
      const venueIDs = [...new Set(filteredEvents.map(event => event.VenueID))];


      const venues = await Promise.all(venueIDs.map(async id => {
        const venue = await mainFetcher(`/venues/${id}`)
        return venue
      }))

      filteredVenues = await Promise.all(venues.map(async venue => {
        if (venue.id === 81) {
          return venue
        }
        const URI = encodeURI(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${query.address}&destinations=${venue.title}&region=gr&key=${process.env.DISTANCE_MATRIX_API}`)
        const response = await fetch(URI)
        let distance = await response.json()
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

  return {
    props: {
      events: filteredEvents,
      venues: filteredVenues,
    }
  }
}

const FindShow = ({ events, venues }) => {
  const classes = useStyles();

  const router = useRouter();

  const [autocompleteService, setAutocompleteService] = useState(null)
  const [predictions, setPredictions] = useState([])
  const [checked, setChecked] = useState(true)
  const [radioState, setRadioState] = useState('a')

  const [formData, dispatch] = useReducer(reducer, initialFormData)
  const [errorText, dispatchError] = useReducer(reducer, initialErrorData)

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
    }
  }

  const validateForm = () => {
    let dataValid = true;
    if (!formData.dateStart) {
      dispatchError({ field: "dateStart", value: "Επιλέξτε Ημερομηνία!" })
      dataValid = false;
    }
    if (radioState === 'b' && !formData.dateEnd) {
      dispatchError({ field: "dateEnd", value: "Επιλέξτε Ημερομηνία!" })
      dataValid = false;
    }
    if (checked && !formData.address) {
      dispatchError({ field: "address", value: "Συμπληρώστε την διεύθυνσή σας!" })
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
      <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_JAVASCRIPT_API}&libraries=places`} onLoad={() => handleScriptLoad(setAutocompleteService)} />
      <div className={classes.pageWrapper}>
        <div className={classes.content}>
          <Typography variant="h2" component="h1" className={classes.underlineDecoration}>Βρες Μια Παράσταση</Typography>
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
                  label="Συγκεκριμένη Ημερομηνία"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={radioState === 'b'}
                      value='b'
                      onChange={handleRadioChange}
                    />
                  }
                  label="Εύρος Ημερομηνιών"
                />
              </div>
              <div className={classes.formDates}>
                <TextField color="secondary"
                  id="dateStart"
                  label={radioState === 'a' ? "Ημερομηνία" : "Από:"}
                  type="date"
                  value={formData.dateStart}
                  error={errorText.dateStart ? true : false}
                  helperText={errorText.dateStart}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaCalendarAlt fontSize={24} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField color="secondary"
                  id="dateEnd"
                  label="Έως:"
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaCalendarAlt fontSize={24} />
                      </InputAdornment>
                    ),
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
                label="Περιορισμός Απόστασης"
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
                    label="Διεύθυνση:"
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
                  <b>Μέγιστη Απόσταση: </b> {formData.maxDistance} χιλιόμετρα
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
              type="submit"
              variant="outlined"
              startIcon={<SearchIcon fontSize="large" />}
              className={classes.button}>
              Αναζήτηση
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default FindShow;

