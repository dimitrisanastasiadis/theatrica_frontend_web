import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { useEffect, useState } from "react"
import { DatePickerTheme } from "../../src/assets/themes/DarkTheme"
import { ThemeProvider, makeStyles, Typography, Radio, FormControlLabel, CircularProgress } from "@material-ui/core"
import style from "../../src/assets/jss/layouts/statsPageStyle"
import events from "../../public/events.json"
import { TimeRange } from '@nivo/calendar'
import grLocale from "date-fns/locale/el"
import { useRouter } from "next/router"
import endOfMonth from 'date-fns/endOfMonth'
import { ResponsivePieCanvas } from "@nivo/pie"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList } from "recharts"
import { mainFetcher } from "../../src/utils/AxiosInstances"
import { internalFetcher } from "../../src/utils/AxiosInstances"
import parsePrice from "parse-price"

const useStyles = makeStyles(style);

const calendarTheme = ({
  textColor: "#fff",
  tooltip: {
    container: {
      background: "#373737"
    }
  }
})

export const getServerSideProps = async ({ query }) => {
  const months = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμριος", "Οκτώριος", "Νοέμβριος", "Δεκέμβριος"]

  const dateStart = new Date(query.year, query.month || 0, 1, 0, 0, 0)
  let dateEnd = new Date(query.year, 11, 31, 23, 59, 59)

  if (query.month)
    dateEnd = endOfMonth(dateStart)

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.DateEvent)
    if (eventDate > dateStart && eventDate <= dateEnd) {
      return true;
    }
  })

  const eventsByDayMap = new Map();
  const eventsByMonthMap = new Map();
  const eventsByShowMap = new Map();
  const eventsByVenueMap = new Map();
  const priceByShowMap = new Map();

  filteredEvents.forEach(event => {
    const eventDate = new Date(event.DateEvent)
    const isoDate = eventDate.toISOString().split('T')[0]

    if (!eventsByDayMap.has(isoDate)) {
      eventsByDayMap.set(isoDate, { value: 1 })
    } else {
      eventsByDayMap.get(isoDate).value++
    }

    if (!eventsByMonthMap.has(eventDate.getMonth())) {
      eventsByMonthMap.set(eventDate.getMonth(), { value: 1 })
    } else {
      eventsByMonthMap.get(eventDate.getMonth()).value++
    }

    if (!eventsByShowMap.has(event.ProductionID)) {
      eventsByShowMap.set(event.ProductionID, { value: 1 })
    } else {
      eventsByShowMap.get(event.ProductionID).value++
    }

    if (!eventsByVenueMap.has(event.VenueID)) {
      eventsByVenueMap.set(event.VenueID, { value: 1, shows: [event.ProductionID] })
    } else {
      eventsByVenueMap.get(event.VenueID).value++
      if (!eventsByVenueMap.get(event.VenueID).shows.includes(event.ProductionID)) {
        eventsByVenueMap.get(event.VenueID).shows.push(event.ProductionID)
      }
    }

    let price = event.PriceRange.match(/\d+,\d{2}€/g)
    if (price) {
      price = price.map(item => parsePrice(item))
      price = Math.max(...price)
      if (!priceByShowMap.has(event.ProductionID)) {
        priceByShowMap.set(event.ProductionID, price)
      } else {
        if (price > priceByShowMap.get(event.ProductionID)) {
          priceByShowMap.set(event.ProductionID, price)
        }
      }
    }
  })

  const eventsByDate = Array.from(eventsByDayMap, event => {
    return {
      day: event[0],
      value: event[1].value
    }
  })

  const eventsByMonth = Array.from(eventsByMonthMap, month => {
    return {
      id: months[month[0]],
      value: month[1].value
    }
  })

  let eventsByShow = Array.from(eventsByShowMap, show => {
    return {
      id: show[0],
      value: show[1].value
    }
  })

  eventsByShow.sort((a, b) => b.value - a.value)

  eventsByShow = eventsByShow.slice(0, 5)

  eventsByShow = await Promise.all(eventsByShow.map(async show => {
    const production = await mainFetcher(`/productions/${show.id}`)

    return {
      ...show,
      name: production.title
    }
  }))

  let eventsByVenue = Array.from(eventsByVenueMap, venue => {
    return {
      id: venue[0],
      value: venue[1].value,
      uniqueShows: venue[1].shows
    }
  })

  eventsByVenue.sort((a, b) => b.value - a.value)

  eventsByVenue = eventsByVenue.slice(0, 5)

  eventsByVenue = await Promise.all(eventsByVenue.map(async venue => {
    const fetchedVenue = await mainFetcher(`/venues/${venue.id}`)

    return {
      ...venue,
      name: fetchedVenue.title
    }
  }))

  eventsByVenue.forEach(venue => {
    venue.eventsByShow = []
    venue.uniqueShows.forEach(id => {
      venue.eventsByShow.push({
        id: id,
        value: eventsByShowMap.get(id).value
      })
    })
    delete venue.uniqueShows
  })

  if (eventsByVenue[0]) {
    eventsByVenue[0].eventsByShow = await Promise.all(eventsByVenue[0].eventsByShow.map(async show => {
      const fetchedShow = await mainFetcher(`/productions/${show.id}`)

      return {
        ...show,
        name: fetchedShow.title
      }
    }))
  }

  let priceByShow = Array.from(priceByShowMap, show => {
    return {
      id: show[0],
      value: show[1]
    }
  })

  priceByShow.sort((a, b) => b.value - a.value)

  priceByShow = priceByShow.slice(0, 5)

  priceByShow = await Promise.all(priceByShow.map(async show => {
    const production = await mainFetcher(`/productions/${show.id}`)

    return {
      ...show,
      name: production.title
    }
  }))

  return {
    props: {
      eventsByDate,
      eventsByMonth,
      eventsByShow,
      eventsByVenue,
      priceByShow
    }
  }
}

const CustomTooltip = ({ value, date }) => {
  const classes = useStyles()

  return (
    <div className={classes.tooltip}>
      <div>
        {`${date.toLocaleDateString("el", { day: "numeric", month: "short" })}`}
      </div>
      <div>
        {`${value} εκδηλώσεις`}
      </div>

    </div>
  )
}

const StatsPage = ({ eventsByDate, eventsByMonth, eventsByShow, eventsByVenue, priceByShow }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mode, setMode] = useState("year")
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pixelRatio, setPixelRatio] = useState(1)

  const classes = useStyles()
  const router = useRouter()

  const lastDayMonth = endOfMonth(selectedDate)

  const handleDateChange = date => {
    setSelectedDate(date)
    if (mode === "year")
      router.push(`/stats?year=${date.getFullYear()}`)
    else
      router.push(`/stats?year=${date.getFullYear()}&month=${date.getMonth()}`)
  }

  const handleRadioChange = event => {
    setMode(event.target.value);
  };

  const handleBarClick = async payload => {
    if (payload) {
      setLoading(true)
      if (!eventsByVenue[payload.activeTooltipIndex].eventsByShow[0].name) {
        const showIds = eventsByVenue[payload.activeTooltipIndex].eventsByShow.map(show => show.id)
        const names = await internalFetcher('/api/getShowNameById', showIds)
        eventsByVenue[payload.activeTooltipIndex].eventsByShow.forEach(show => {
          show.name = names[show.id]
        })
      }
      setActiveIndex(payload.activeTooltipIndex)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!router.query.year) {
      router.push(`/stats?year=${selectedDate.getFullYear()}`)
    }
  }, [router, selectedDate])

  useEffect(() => {
    const { devicePixelRatio: ratio = 1 } = window
    setPixelRatio(ratio)
  }, [])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={grLocale}>
      <div className="pageWrapper" style={{ overflow: "hidden" }}>
        <div className="pageContent">
          <Typography variant="h2" component="h1">Στατιστικά</Typography>
          <div style={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Radio
                  checked={mode === "year"}
                  value="year"
                  onChange={handleRadioChange}
                />
              }
              label="Έτος"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={mode === "month"}
                  value="month"
                  onChange={handleRadioChange}
                />
              }
              label="Μήνας"
            />
          </div>
          <ThemeProvider theme={DatePickerTheme}>
            <DatePicker inputVariant="outlined" value={selectedDate} onChange={handleDateChange} views={mode === "year" ? ["year"] : ["month", "year"]} minDate={"2020-01-01"} maxDate={"2022-12-31"} />
          </ThemeProvider>
          {eventsByDate.length > 0 ?
            <>
              <div style={{ marginTop: 50 }}>
                <Typography variant="h3" component="h2">Εκδηλώσεις ανά Ημέρα</Typography>
                <div className={classes.calendarContainer}>
                  <div className={classes.weekdaysLegendContainer}>
                    <span>Δευ</span>
                    <span>Τετ</span>
                    <span>Παρ</span>
                  </div>
                  <TimeRange
                    width={940}
                    height={220}
                    theme={calendarTheme}
                    data={eventsByDate}
                    from={new Date(router.query.year, router.query.month || 0, 1, 0, 0, 0)}
                    to={!router.query.month ? `${router.query.year}-12-31` : lastDayMonth}
                    emptyColor="#303030"
                    colors={['#0e4429', '#006d32', '#26a641', '#39d353']}
                    margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
                    monthBorderWidth={2}
                    monthBorderColor="#191919"
                    dayBorderWidth={2}
                    dayBorderColor="#191919"
                    weekdayLegendOffset={30}
                    weekdayTicks={[]}
                    dayRadius={2}
                    monthLegend={(year, month, date) => date.toLocaleDateString("el", { month: "short" })}
                    tooltip={CustomTooltip}
                    legends={[
                      {
                        anchor: 'bottom-left',
                        direction: 'row',
                        justify: false,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left',
                        translateY: -40,
                        symbolSize: 20
                      }
                    ]}
                  />
                </div>
              </div>
              <div className={classes.flexChartContainer}>
                {!router.query.month &&
                  <div className={classes.chartContainer}>
                    <Typography variant="h3" component="h2">Εκδηλώσεις ανά Μήνα</Typography>
                    <ResponsivePieCanvas
                      data={eventsByMonth}
                      theme={calendarTheme}
                      margin={{ top: 50, right: 20, bottom: 50, left: 20 }}
                      innerRadius={0.5}
                      padAngle={1.4}
                      arcLabelsTextColor="#000"
                      arcLabel="id"
                      cornerRadius={3}
                      activeOuterRadiusOffset={8}
                      borderWidth={1}
                      enableArcLinkLabels={false}
                      pixelRatio={pixelRatio}
                      borderColor={{
                        from: 'color',
                        modifiers: [
                          [
                            'darker',
                            0.2
                          ]
                        ]
                      }}
                      arcLinkLabelsTextColor="#333333"
                      arcLabelsSkipAngle={30}
                    />
                  </div>
                }
                <div className={classes.chartContainer}>
                  <Typography variant="h3" component="h2">Παραστάσεις Με Τις Περισσότερες Εκδηλώσεις</Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      margin={{ top: 50, right: 20, bottom: 60, left: 20 }}
                      data={eventsByShow}
                      layout="vertical">
                      <XAxis type="number" label={{value: "Εκδηλώσεις", position: "bottom", fill: "#666"}} />
                      <YAxis type="category" dataKey="name" width={1} tick={false} />
                      <Tooltip cursor={{ fillOpacity: 0.35 }} contentStyle={{ backgroundColor: "#373737", border: 0 }} itemStyle={{ color: "#fff" }} />
                      <Bar dataKey="value" fill="#71FFFA" name="Εκδηλώσεις">
                        <LabelList dataKey="name" position="inside" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className={classes.chartContainer}>
                  <Typography variant="h3" component="h2">Θέατρα Με Τις Περισσότερες Εκδηλώσεις</Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      onClick={handleBarClick}
                      margin={{ top: 50, right: 20, bottom: 60, left: 20 }}
                      data={eventsByVenue.slice(0, 5)}
                      layout="vertical"
                      style={{ cursor: "pointer" }}>
                      <XAxis type="number" label={{value: "Εκδηλώσεις", position: "bottom", fill: "#666"}} />
                      <YAxis type="category" dataKey="name" width={1} tick={false} />
                      <Tooltip cursor={{ fillOpacity: 0.35 }} contentStyle={{ backgroundColor: "#373737", border: 0 }} itemStyle={{ color: "#fff" }} />
                      <Bar dataKey="value" fill="#71FFFA" name="Εκδηλώσεις">
                        <LabelList dataKey="name" position="inside" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className={classes.chartContainer}>
                  <Typography variant="h3" component="h2">{`${eventsByVenue[activeIndex].name} - Εκδηλώσεις Ανά Παράσταση`}</Typography>
                  {loading ?
                    <div className={classes.loadingContainer}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <ResponsivePieCanvas
                      data={eventsByVenue[activeIndex].eventsByShow}
                      id="name"
                      theme={calendarTheme}
                      margin={{ top: 50, right: 20, bottom: 80, left: 20 }}
                      innerRadius={0.5}
                      padAngle={1.4}
                      arcLabelsTextColor="#000"
                      arcLabel="value"
                      cornerRadius={3}
                      activeOuterRadiusOffset={8}
                      borderWidth={1}
                      enableArcLinkLabels={false}
                      pixelRatio={pixelRatio}
                      borderColor={{
                        from: 'color',
                        modifiers: [
                          [
                            'darker',
                            0.2
                          ]
                        ]
                      }}
                      arcLinkLabelsTextColor="#333333"
                      arcLabelsSkipAngle={20}
                    />}
                </div>
                <div className={classes.chartContainer}>
                  <Typography variant="h3" component="h2">Ακριβότερες Παραστάσεις</Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      margin={{ top: 50, right: 20, bottom: 60, left: 20 }}
                      data={priceByShow}
                      layout="vertical">
                      <XAxis type="number" unit="€" />
                      <YAxis type="category" dataKey="name" width={1} tick={false} />
                      <Tooltip cursor={{ fillOpacity: 0.35 }} contentStyle={{ backgroundColor: "#373737", border: 0 }} itemStyle={{ color: "#fff" }} formatter={value => `${value}€`} />
                      <Bar dataKey="value" fill="#71FFFA" name="Τιμή">
                        <LabelList dataKey="name" position="inside" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </> :
            <Typography>Δεν υπάρχουν στατιστικά για την συγκεκριμένη περίοδο!</Typography>
          }
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default StatsPage;