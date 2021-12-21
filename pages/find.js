import { makeStyles, Typography, TextField, Slider, Button, InputAdornment } from "@material-ui/core";
import style from "../src/assets/jss/layouts/findStyle"
import { useReducer, useEffect, useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { FaCalendarAlt } from 'react-icons/fa'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Script from "next/script"

let sessionToken;

function handleScriptLoad(setService) {
  sessionToken = new google.maps.places.AutocompleteSessionToken();
  const autocompleteService = new google.maps.places.AutocompleteService();
  setService(autocompleteService);
}

const useStyles = makeStyles(style);

const initialFormData = {
  address: '',
  dateStart: '',
  dateEnd: '',
  maxDistance: 0
}

const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value
  }
}

const FindShow = () => {
  const classes = useStyles();

  const [autocompleteService, setAutocompleteService] = useState(null)
  const [predictions, setPredictions] = useState([])
  const [formData, dispatch] = useReducer(reducer, initialFormData)

  const handleChange = (event) => {
    dispatch({ field: event.target.id, value: event.target.value })
  }

  const handleSliderChange = (event, newValue) => {
    dispatch({ field: "maxDistance", value: newValue })
  }

  const handlePlaceSelect = (event, newValue) => {
    dispatch({ field: "address", value: newValue })
  }

  const handleSubmit = event => {
    console.log("Submit fired")
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
          <form onSubmit={handleSubmit} className={classes.form}>
            <Autocomplete
              freeSolo
              id="address"
              onChange={handlePlaceSelect}
              value={formData.address}
              fullWidth
              options={predictions ? predictions.map(place => place.description) : []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Διεύθυνση:"
                  margin="normal"
                  variant="outlined"
                  color="secondary"
                  onChange={handleChange}
                  InputProps={{ ...params.InputProps, type: 'search', startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ), }}
                />
              )}
            />
            <div className={classes.formDates}>
              <TextField color="secondary"
                id="dateStart"
                label="Από:"
                type="date"
                value={formData.dateStart}
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
            </div>
            <div className={classes.sliderWrapper}>
              <Typography gutterBottom>
                <b>Μέγιστη Απόσταση: </b> {formData.maxDistance} χιλιόμετρα
              </Typography>
              <Slider
                id="maxDistance"
                color="secondary"
                valueLabelDisplay="auto"
                value={formData.maxDistance}
                onChange={handleSliderChange}
                className={classes.slider}
                classes={{
                  valueLabel: classes.sliderLabel
                }}
              />
            </div>
            <Button
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

