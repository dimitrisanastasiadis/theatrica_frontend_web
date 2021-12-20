import { makeStyles, Typography, TextField, Slider, Button, InputAdornment } from "@material-ui/core";
import style from "../src/assets/jss/layouts/findStyle"
import { useReducer } from "react";
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {FaCalendarAlt} from 'react-icons/fa'

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
    [field] : value
  }
}

const FindShow = () => {
  const classes = useStyles();

  const [formData, dispatch] = useReducer(reducer, initialFormData)

  const handleChange = (event) => {
    dispatch({field: event.target.id, value: event.target.value})
  }

  const handleSliderChange = (event, newValue) => {
    dispatch({field: "maxDistance", value: newValue})
  }

  const handleSubmit = event => {
    console.log("Submit fired")
  }

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.content}>
        <Typography variant="h2" component="h1" className={classes.underlineDecoration}>Βρες Μια Παράσταση</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField 
            color="secondary" 
            id="address" 
            onChange={handleChange} 
            label="Διεύθυνση:" 
            variant="outlined" 
            value={formData.address}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
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
            ΑΝΑΖΗΤΗΣΗ
          </Button>
          {/* <div className={styles.submit}>
            {isProccessing && <LoadingIndicator width={48} />}
            <Button style={{marginLeft: "auto"}}>Send!</Button>
          </div> */}
        </form>
      </div>
    </div>
  )
}

export default FindShow;

