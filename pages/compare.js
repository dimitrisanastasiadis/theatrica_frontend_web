import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import grLocale from "date-fns/locale/el"
import { Typography, makeStyles, FormControlLabel, Radio, ThemeProvider, Button, useTheme, Select, MenuItem } from "@material-ui/core"
import { useEffect, useState } from "react"
import { DatePickerTheme } from "../src/assets/themes/DarkTheme"
import style from "../src/assets/jss/layouts/comparePageStyle"
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { useRouter } from "next/router"
import format from 'date-fns/format'
import endOfMonth from 'date-fns/endOfMonth'
import endOfYear from 'date-fns/endOfYear'
import events from "../public/eventsVeryNew.json"
import getDaysInMonth from 'date-fns/getDaysInMonth'
import getDaysInYear from 'date-fns/getDaysInYear'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LabelList, BarChart, Bar } from 'recharts';
import getDayOfYear from 'date-fns/getDayOfYear'
import parsePrice from "parse-price"
import Head from "next/head"
import { months } from "../src/utils/constants"

const useStyles = makeStyles(style);

export const getServerSideProps = async ({ query }) => {
  let stat = [];
  let statTitle = "";

  const firstDateStart = new Date(`${query.date1} 00:00:00`)
  const secondDateStart = new Date(`${query.date2} 00:00:00`)
  let firstDateEnd
  let secondDateEnd

  const firstDateLabel = query.mode === "year" ? firstDateStart.getFullYear() : `${months[firstDateStart.getMonth()]} ${firstDateStart.getFullYear()}`
  const secondDateLabel = query.mode === "year" ? secondDateStart.getFullYear() : `${months[secondDateStart.getMonth()]} ${secondDateStart.getFullYear()}`

  const labels = [firstDateLabel, secondDateLabel]

  const size = query.mode === "year" ? Math.max(getDaysInYear(firstDateStart), getDaysInYear(secondDateStart)) : Math.max(getDaysInMonth(firstDateStart), getDaysInMonth(secondDateStart))

  if (query.mode === "year") {
    firstDateEnd = endOfYear(firstDateStart)
    secondDateEnd = endOfYear(secondDateStart)
  } else {
    firstDateEnd = endOfMonth(firstDateStart)
    secondDateEnd = endOfMonth(secondDateStart)
  }

  const getEventsByDate = (dateStart, dateEnd) => {
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.DateEvent)
      if (eventDate > dateStart && eventDate < dateEnd) {
        return true;
      }
    })

    const eventsByDayMap = new Map();

    filteredEvents.forEach(event => {
      const eventDate = new Date(event.DateEvent)
      const day = query.mode === "year" ? getDayOfYear(eventDate) : eventDate.getDate()

      if (!eventsByDayMap.has(day)) {
        eventsByDayMap.set(day, { value: 1 })
      } else {
        eventsByDayMap.get(day).value++
      }
    })
    return eventsByDayMap
  }

  const getTotalEvents = (dateStart, dateEnd) => {
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.DateEvent)
      if (eventDate > dateStart && eventDate < dateEnd) {
        return true;
      }
    })
    return filteredEvents.length
  }

  const getNumberOfShows = (dateStart, dateEnd) => {
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.DateEvent)
      if (eventDate > dateStart && eventDate < dateEnd) {
        return true;
      }
    })

    const uniqueShows = [...new Set(filteredEvents.map(event => event.ProductionID))]

    return uniqueShows.length
  }

  const getNumberOfShowsByMonth = (dateStart, dateEnd) => {
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.DateEvent)
      if (eventDate > dateStart && eventDate < dateEnd) {
        return true;
      }
    })

    const showsByMonthMap = new Map()

    filteredEvents.forEach(event => {
      const eventDate = new Date(event.DateEvent)

      if (!showsByMonthMap.has(eventDate.getMonth())) {
        showsByMonthMap.set(eventDate.getMonth(), [event.ProductionID])
      } else {
        if (!showsByMonthMap.get(eventDate.getMonth()).includes(event.ProductionID)) {
          showsByMonthMap.get(eventDate.getMonth()).push(event.ProductionID)
        }
      }
    })

    return showsByMonthMap
  }

  const getNumberOfEventsByMonth = (dateStart, dateEnd) => {
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.DateEvent)
      if (eventDate > dateStart && eventDate < dateEnd) {
        return true;
      }
    })

    const eventsByMonthMap = new Map()

    filteredEvents.forEach(event => {
      const eventDate = new Date(event.DateEvent)

      if (!eventsByMonthMap.has(eventDate.getMonth())) {
        eventsByMonthMap.set(eventDate.getMonth(), { value: 1 })
      } else {
        eventsByMonthMap.get(eventDate.getMonth()).value++
      }
    })

    return eventsByMonthMap
  }

  const getTicketAveragePrice = (dateStart, dateEnd) => {
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.DateEvent)
      if (eventDate > dateStart && eventDate < dateEnd) {
        return true;
      }
    })

    const pricesPerDayMap = new Map()

    filteredEvents.forEach(event => {
      const eventDate = new Date(event.DateEvent)
      const day = query.mode === "year" ? getDayOfYear(eventDate) : eventDate.getDate()

      let price = event.PriceRange.match(/\d+,*\d*€/g)
      if (price) {
        price = price.map(item => parsePrice(item))
        price = Math.max(...price)
        if (!pricesPerDayMap.has(day)) {
          pricesPerDayMap.set(day, [price])
        } else {
          pricesPerDayMap.get(day).push(price)
        }
      }
    })

    pricesPerDayMap.forEach((value, key) => {
      const sum = value.reduce((a, b) => a + b, 0)
      let avg = sum / value.length
      avg = Math.round(avg * 10) / 10

      pricesPerDayMap.set(key, avg)
    })

    return pricesPerDayMap
  }

  if (query.stat === "showsByMonth") {
    const showsByMonth1 = getNumberOfShowsByMonth(firstDateStart, firstDateEnd)
    const showsByMonth2 = getNumberOfShowsByMonth(secondDateStart, secondDateEnd)

    for (let i = 0; i < 12; i++) {
      stat.push(
        {
          name: months[i].substring(0,3),
          [labels[0]]: showsByMonth1.get(i) ? showsByMonth1.get(i).length : 0,
          [labels[1]]: showsByMonth2.get(i) ? showsByMonth2.get(i).length : 0
        }
      )
    }

    statTitle = "Παραγωγές ανά Μήνα"
  }

  if (query.stat === "eventsByDate") {
    const eventsByDate1 = getEventsByDate(firstDateStart, firstDateEnd)
    const eventsByDate2 = getEventsByDate(secondDateStart, secondDateEnd)

    const eventsByDateMerged = []
    let accum1 = 0;
    let accum2 = 0;

    for (let i = 1; i <= size; i++) {
      const value1 = eventsByDate1.get(i) ? eventsByDate1.get(i).value : 0;
      const value2 = eventsByDate2.get(i) ? eventsByDate2.get(i).value : 0;

      accum1 += value1
      accum2 += value2

      const day = {
        day: i,
        [firstDateLabel]: accum1,
        [secondDateLabel]: accum2
      }
      eventsByDateMerged.push(day)
    }
    stat = eventsByDateMerged
    statTitle = "Αθροιστικός Αριθμός Παραστάσεων ανά Ημέρα"
  }

  if (query.stat === "avgPriceByDate") {
    const avgPriceByDate1 = getTicketAveragePrice(firstDateStart, firstDateEnd)
    const avgPriceByDate2 = getTicketAveragePrice(secondDateStart, secondDateEnd)

    const eventsByDateMerged = []

    for (let i = 1; i <= size; i++) {
      const day = {
        day: i
      }

      if (avgPriceByDate1.has(i)){
        day[firstDateLabel] = avgPriceByDate1.get(i)
      }

      if (avgPriceByDate2.has(i)){
        day[secondDateLabel] = avgPriceByDate2.get(i)
      }
      eventsByDateMerged.push(day)
    }

    stat = eventsByDateMerged
    statTitle = "Μέσος Όρος Τιμών Εισητηρίων ανά Ημέρα"
  }

  if (query.stat === "totalEvents") {
    const totalEvents1 = getTotalEvents(firstDateStart, firstDateEnd)
    const totalEvents2 = getTotalEvents(secondDateStart, secondDateEnd)

    stat = [
      {
        name: firstDateLabel,
        value: totalEvents1
      },
      {
        name: secondDateLabel,
        value: totalEvents2
      }
    ]

    statTitle = "Αριθμός Παραστάσεων"
  }

  if (query.stat === "numberOfShows") {
    const numberOfShows1 = getNumberOfShows(firstDateStart, firstDateEnd)
    const numberOfShows2 = getNumberOfShows(secondDateStart, secondDateEnd)

    stat = [
      {
        name: firstDateLabel,
        value: numberOfShows1
      },
      {
        name: secondDateLabel,
        value: numberOfShows2
      }
    ]

    statTitle = "Αριθμός Παραγωγών"
  }

  if (query.stat === "eventsByMonth") {
    const eventsByMonth1 = getNumberOfEventsByMonth(firstDateStart, firstDateEnd)
    const eventsByMonth2 = getNumberOfEventsByMonth(secondDateStart, secondDateEnd)

    for (let i = 0; i < 12; i++) {
      stat.push(
        {
          name: months[i].substring(0,3),
          [labels[0]]: eventsByMonth1.get(i) ? eventsByMonth1.get(i).value : 0,
          [labels[1]]: eventsByMonth2.get(i) ? eventsByMonth2.get(i).value : 0
        }
      )
    }
  }

  return {
    props: {
      stat,
      labels,
      statTitle
    }
  }
}

const ComparePage = ({ stat, labels, statTitle }) => {
  const classes = useStyles()
  const router = useRouter()
  const theme = useTheme()

  const [mode, setMode] = useState(router.query.mode || "year")
  const [statValue, setStatValue] = useState(router.query.stat || "eventsByDate")

  const [firstDate, setFirstDate] = useState(new Date(router.query.date1 || '2021'));
  const [secondDate, setSecondDate] = useState(new Date(router.query.date2 || '2022'));
  const [errorText, setErrorText] = useState("")

  useEffect(() => {
    router.push({
      pathname: "/compare",
      query: {
        ...router.query,
        stat: statValue
      }
    },
      undefined,
      {
        scroll: false
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statValue])

  useEffect(() => {
    const formatString = mode === "year" ? "yyyy" : "yyyy-M"
    const date1 = format(firstDate, formatString)
    const date2 = format(secondDate, formatString)

    if (date1 === date2){
      setErrorText("Επιλέξτε Διαφορετικές Περιόδους!")
    } else {
      setErrorText("")
    }
  }, [firstDate, mode, secondDate])

  const handleRadioChange = event => {
    setMode(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault()
    const formatString = mode === "year" ? "yyyy" : "yyyy-M"
    const date1 = format(firstDate, formatString)
    const date2 = format(secondDate, formatString)

    let initialStat = statValue;

    if (mode === "month" && (initialStat === "eventsByMonth" || initialStat === "showsByMonth")) {
      initialStat = "eventsByDate"
    }

    if (date1 !== date2){
      router.push(`/compare?date1=${date1}&date2=${date2}&mode=${mode}&stat=${initialStat}`)
    }
  }

  const handleSelectChange = event => {
    setStatValue(event.target.value);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={grLocale}>
      <Head>
        <title>Σύγκριση Χρονικών Περιόδων | Theatrica</title>
      </Head>
      <div className="pageWrapper" style={{ overflow: "hidden" }}>
        <div className="pageContent">
          <Typography variant="h2" component="h1">Σύγκριση Χρονικών Περιόδων</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={mode === "year"}
                    value="year"
                    onChange={handleRadioChange}
                  />
                }
                label="Έτη"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={mode === "month"}
                    value="month"
                    onChange={handleRadioChange}
                  />
                }
                label="Μήνες"
              />
            </div>
            <ThemeProvider theme={() => DatePickerTheme(theme.palette.secondary.main)}>
              <div className={classes.pickersContainer}>
                <DatePicker
                  label={mode === "year" ? "Έτος 1" : "Μήνας 1"}
                  value={firstDate}
                  inputVariant="outlined"
                  onChange={setFirstDate}
                  views={mode === "year" ? ["year"] : ["month", "year"]}
                  minDate={"2021-01-01"} maxDate={"2023-12-31"} />
                <DatePicker
                  label={mode === "year" ? "Έτος 2" : "Μήνας 2"}
                  value={secondDate}
                  inputVariant="outlined"
                  onChange={setSecondDate}
                  views={mode === "year" ? ["year"] : ["month", "year"]}
                  minDate={"2021-01-01"} maxDate={"2023-12-31"} 
                  error={errorText ? true : false}
                  helperText={errorText}
                  />
              </div>
            </ThemeProvider>
            <Button
              className={classes.button}
              variant="outlined"
              startIcon={<CompareArrowsIcon fontSize="large" />}
              type="submit"
            >
              Σύγκριση
            </Button>

          </form>
          {(router.query.date1 && router.query.date2) &&
            <>
              <div style={{ marginTop: 100 }}>
                <Typography variant="h3" component="h2" style={{ marginBottom: 15 }}>{labels[0]} vs {labels[1]}</Typography>
                <Select
                  value={statValue}
                  onChange={handleSelectChange}
                  variant="outlined"
                  style={{ width: 250 }}
                  defaultValue="eventsByDate"
                >
                  <MenuItem value="eventsByDate">Αθροιστικός Αριθμός Παραστάσεων ανά Ημέρα</MenuItem>
                  <MenuItem value="totalEvents">Αριθμός Παραστάσεων</MenuItem>
                  {router.query.mode === "year" && <MenuItem value="eventsByMonth">Παραστάσεις ανά Μήνα</MenuItem>}
                  <MenuItem value="numberOfShows">Αριθμός Παραγωγών</MenuItem>
                  {router.query.mode === "year" && <MenuItem value="showsByMonth">Παραγωγές ανά Μήνα</MenuItem>}
                  <MenuItem value="avgPriceByDate">Μέσος Όρος Τιμών Εισητηρίων ανά Ημέρα</MenuItem>
                </Select>
              </div>

              <div className={classes.graphContainer}>
                <Typography variant="h4" component="h3">{statTitle}</Typography>
                {(router.query.stat === "eventsByDate" || router.query.stat === "avgPriceByDate") &&
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={stat}
                      margin={{
                        top: 10,
                        right: 5,
                        left: 5,
                        bottom: 0,
                      }}
                    >
                      <XAxis dataKey="day" />
                      <YAxis mirror />
                      <Tooltip contentStyle={{ backgroundColor: "#373737", border: 0 }} itemStyle={{ color: "#fff" }} formatter={value => `${value} ${router.query.stat === "eventsByDate" ? "παραστάσεις" : "€"}`} labelFormatter={(d) => `Ημέρα ${d}`} />
                      <Legend verticalAlign="top" wrapperStyle={{ top: 0 }} />
                      <Line connectNulls type="monotone" dataKey={labels[0]} dot={false} stroke={theme.palette.secondary.main} fill={theme.palette.secondary.main} strokeWidth={2} />
                      <Line connectNulls type="monotone" dataKey={labels[1]} dot={false} stroke="#fd2155" fill="#fd2155" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                }
                {(router.query.stat === "totalEvents" || router.query.stat === "numberOfShows") &&
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={stat}
                        dataKey="value"
                      >

                        <Cell fill={theme.palette.secondary.main} stroke={theme.palette.background.default} strokeWidth={2} />
                        <Cell fill="#fd2155" stroke={theme.palette.background.default} strokeWidth={2} />
                        <LabelList dataKey="value" strokeWidth={0} fill="#000" />
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#373737", border: 0 }} itemStyle={{ color: "#fff" }} formatter={value => `${value} ${router.query.stat === "totalEvents" ? "παραστάσεις" : "παραγωγές"}`} />
                      <Legend verticalAlign="top" wrapperStyle={{ top: 0 }} />
                    </PieChart>
                  </ResponsiveContainer>
                }
                {(router.query.stat === "showsByMonth" || router.query.stat === "eventsByMonth") &&
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={stat}
                      margin={{
                        top: 10,
                        right: 5,
                        left: 5,
                        bottom: 0,
                      }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis tick={false} width={1} />
                      <Tooltip cursor={{ fillOpacity: 0.35 }} contentStyle={{ backgroundColor: "#373737", border: 0 }} itemStyle={{ color: "#fff" }} formatter={value => `${value} ${router.query.stat === "showsByMonth" ? "παραγωγές" : "παραστάσεις"}`} />
                      <Legend verticalAlign="top" wrapperStyle={{ top: 0 }} />
                      <Bar dataKey={labels[0]} fill={theme.palette.secondary.main} />
                      <Bar dataKey={labels[1]} fill="#fd2155" />
                    </BarChart>
                  </ResponsiveContainer>
                }
              </div>
            </>
          }
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}



export default ComparePage;