import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { useEffect, useState, useMemo } from "react"
import { DatePickerTheme } from "../../src/assets/themes/DarkTheme"
import { ThemeProvider, makeStyles, Typography, Radio, FormControlLabel, CircularProgress, Chip, Link, useTheme, IconButton } from "@material-ui/core"
import style from "../../src/assets/jss/layouts/statsPageStyle"
import events from "../../public/eventsVeryNew.json"
import { TimeRange } from '@nivo/calendar'
import grLocale from "date-fns/locale/el"
import { useRouter } from "next/router"
import endOfMonth from 'date-fns/endOfMonth'
import { ResponsivePieCanvas } from "@nivo/pie"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList } from "recharts"
import { mainFetcher } from "../../src/utils/AxiosInstances"
import { internalFetcher } from "../../src/utils/AxiosInstances"
import parsePrice from "parse-price"
import startOfMonth from 'date-fns/startOfMonth'
import NextLink from "next/link"
import format from 'date-fns/format'
import Head from "next/head"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LoadingScene from "../../src/components/LoadingScene"
import { months } from "../../src/utils/constants"

const useStyles = makeStyles(style);

const calendarTheme = ({
  textColor: "#fff",
  tooltip: {
    container: {
      background: "#373737"
    }
  }
})

export const getStaticPaths = async () => {

  const date = new Date()

  const paths = [
    {
      params: {
        query: ["2021"]
      }
    },
    {
      params: {
        query: ["2022"]
      }
    },
    {
      params: {
        query: ["2023"]
      }
    },
    {
      params: {
        query: [date.getFullYear().toString(), date.getMonth().toString()]
      }
    }
  ]

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const dateStart = new Date(params.query[0], params.query[1] || 0, 1, 0, 0, 0)
  let dateEnd = new Date(params.query[0], 11, 31, 23, 59, 59)

  if (params.query[1])
    dateEnd = endOfMonth(dateStart)

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.DateEvent)
    if (eventDate > dateStart && eventDate < dateEnd) {
      return true;
    }
  })

  if (filteredEvents.length < 1){
    return {
      notFound: true
    }
  }

  const eventsByDayMap = new Map();
  const eventsByMonthMap = new Map();
  const eventsByShowMap = new Map();
  const eventsByVenueMap = new Map();
  const priceByShowMap = new Map();
  const showsByMonthMap = new Map();

  filteredEvents.forEach(event => {
    const eventDate = new Date(event.DateEvent)
    const isoDate = format(eventDate, 'yyyy-MM-dd')

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

    if (!showsByMonthMap.has(eventDate.getMonth())) {
      showsByMonthMap.set(eventDate.getMonth(), [event.ProductionID])
    } else {
      if (!showsByMonthMap.get(eventDate.getMonth()).includes(event.ProductionID)) {
        showsByMonthMap.get(eventDate.getMonth()).push(event.ProductionID)
      }
    }

    let price = event.PriceRange.match(/\d+,*\d*€/g)
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

  const showsByMonth = Array.from(showsByMonthMap, month => {
    return {
      id: months[month[0]],
      value: month[1].length
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
      priceByShow,
      showsByMonth
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
        {`${value} παραστάσεις`}
      </div>

    </div>
  )
}

const StatsPage = ({ eventsByDate, eventsByMonth, eventsByShow, eventsByVenue, priceByShow, showsByMonth }) => {
  const classes = useStyles()
  const router = useRouter()
  const theme = useTheme()
  const [listVisible, setListVisible] = useState(false)

  const [mode, setMode] = useState("year")
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pixelRatio, setPixelRatio] = useState(1)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showsByDate, setShowsByDate] = useState([])
  const [showsLoading, setShowsLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)

  const lastDayMonth = useMemo(() => {
    if (router.query.query)
      return endOfMonth(new Date(router.query.query[0] || 2021, router.query.query[1] || 0))
  }, [router.query.query])

  const handleDateChange = date => {
    setSelectedDate(startOfMonth(date))
    if (mode === "year")
      router.push(`/stats/${date.getFullYear()}`)
    else
      router.push(`/stats/${date.getFullYear()}/${date.getMonth()}`)
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

  const handleCalendarClick = async (day, event) => {
    setSelectedDate(day.date)
  }

  useEffect(() => {
    const { devicePixelRatio: ratio = 1 } = window
    setPixelRatio(ratio)
  }, [])

  useEffect(() => {
    if (router.query.query)
      setSelectedDate(new Date(router.query.query[0], router.query.query[1] || 0))
  }, [router.query.query])

  useEffect(() => {
    const fetchData = async () => {
      setShowsLoading(true)
      const shows = await internalFetcher('/api/getShowsByDate', { date: format(selectedDate, 'yyyy-MM-dd') })
      setShowsByDate(shows)
      setShowsLoading(false)
    }

    fetchData()
  }, [selectedDate])

  useEffect(() => {
    const loadingTrue = () => setPageLoading(true)
    const loadingFalse = () => setPageLoading(false)

    router.events.on('routeChangeStart', loadingTrue)
    router.events.on('routeChangeComplete', loadingFalse)

    return () => {
      router.events.off('routeChangeStart', loadingTrue)
      router.events.off('routeChangeComplete', loadingFalse)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (router.isFallback || pageLoading){
    return <LoadingScene fullScreen />
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={grLocale}>
      <Head>
        <title>Στατιστικά | Theatrica</title>
      </Head>
      <div className="pageWrapper" style={{ overflow: "hidden" }}>
        <div className="pageContent">
          <Typography variant="h2" component="h1">Στατιστικά {router.query.query[1] && months[router.query.query[1]]} {router.query.query[0]}</Typography>
          <div className={classes.picker}>
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
            <ThemeProvider theme={() => DatePickerTheme(theme.palette.secondary.main)}>
              <DatePicker label="Επιλέξτε Περίοδο" value={lastDayMonth} inputVariant="outlined" onChange={handleDateChange} views={mode === "year" ? ["year"] : ["month", "year"]} minDate={"2021-01-01"} maxDate={"2023-12-31"} />
            </ThemeProvider>
          </div>
          {eventsByDate.length > 0 ?
            <>
              <div style={{ marginTop: 50 }}>
                <Typography variant="h3" component="h2">Παραστάσεις ανά Ημέρα</Typography>
                <div className={classes.calendarContainer}>
                  <div className={classes.weekdaysLegendContainer}>
                    <span>Δευ</span>
                    <span>Τετ</span>
                    <span>Παρ</span>
                  </div>
                  <TimeRange
                    onClick={handleCalendarClick}
                    width={940}
                    height={220}
                    theme={calendarTheme}
                    data={eventsByDate}
                    from={new Date(router.query.query[0], router.query.query[1] || 0, 1, 0, 0, 0)}
                    to={!router.query.query[1] ? `${router.query.query[0]}-12-31` : lastDayMonth}
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
                <div>
                  <Typography variant="h4" component="h3">{selectedDate.toLocaleDateString("el", { day: "numeric", weekday: "long", month: "long", year: "numeric" })}</Typography>
                  {showsLoading ?
                    <div className={classes.loadingContainer}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <div className={classes.listContainer}>
                      <ul className={`${classes.list} ${listVisible ? "" : classes.listHidden}`}>
                        {showsByDate && showsByDate.map(venue => {
                          return (
                            <li key={venue.id}>
                              <div>
                                <NextLink href={`/venues/${venue.id}`} passHref>
                                  <Link color="inherit" variant="body1" style={{ display: "inline" }}>{venue.name}:</Link>
                                </NextLink>
                                {venue.shows.map((show) =>
                                  <NextLink key={show.id} href={`/shows/${show.id}`} passHref>
                                    <Chip
                                      label={show.name}
                                      clickable
                                      style={{ margin: 5 }}
                                      size="small"
                                      component="a"
                                    />
                                  </NextLink>

                                )}
                              </div>
                            </li>
                          )
                        })
                        }
                      </ul>
                      <IconButton size="small" className={`${classes.expandButton} ${listVisible ? classes.collapseButton : ""}`} onClick={() => setListVisible(prev => !prev)}>
                        <ExpandMoreIcon />
                      </IconButton>
                    </div>
                  }
                </div>
              </div>
              <div className={classes.flexChartContainer}>
                {!router.query.query[1] &&
                  <>
                    <div className={classes.chartContainer}>
                      <Typography variant="h3" component="h2">Παραγωγές ανά Μήνα</Typography>
                      <ResponsivePieCanvas
                        data={showsByMonth}
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
                    <div className={classes.chartContainer}>
                      <Typography variant="h3" component="h2">Παραστάσεις ανά Μήνα</Typography>
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
                  </>
                }
                <div className={classes.chartContainer}>
                  <Typography variant="h3" component="h2">Παραγωγές Με Τις Περισσότερες Παραστάσεις</Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      margin={{ top: 50, right: 20, bottom: 60, left: 20 }}
                      data={eventsByShow}
                      layout="vertical">
                      <XAxis type="number" label={{ value: "Παραστάσεις", position: "bottom", fill: "#666" }} />
                      <YAxis type="category" dataKey="name" width={1} tick={false} />
                      <Tooltip cursor={{ fillOpacity: 0.35 }} contentStyle={{ backgroundColor: "#373737", border: 0 }} itemStyle={{ color: "#fff" }} />
                      <Bar dataKey="value" fill={theme.palette.secondary.main} name="Παραστάσεις">
                        <LabelList dataKey="name" position="inside" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className={classes.chartContainer}>
                  <Typography variant="h3" component="h2">Θέατρα Με Τις Περισσότερες Παραστάσεις</Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      onClick={handleBarClick}
                      margin={{ top: 50, right: 20, bottom: 60, left: 20 }}
                      data={eventsByVenue}
                      layout="vertical"
                      style={{ cursor: "pointer" }}>
                      <XAxis type="number" label={{ value: "Παραστάσεις", position: "bottom", fill: "#666" }} />
                      <YAxis type="category" dataKey="name" width={1} tick={false} />
                      <Tooltip cursor={{ fillOpacity: 0.35 }} contentStyle={{ backgroundColor: "#373737", border: 0 }} itemStyle={{ color: "#fff" }} />
                      <Bar dataKey="value" fill={theme.palette.secondary.main} name="Παραστάσεις">
                        <LabelList dataKey="name" position="inside" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className={classes.chartContainer}>
                  <Typography variant="h3" component="h2">{`${eventsByVenue[activeIndex].name} - Παραστάσεις Ανά Παραγωγή`}</Typography>
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
                      <Bar dataKey="value" fill={theme.palette.secondary.main} name="Τιμή">
                        <LabelList dataKey="name" position="inside" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </> :
            <>
              {router.query.query[0] && <Typography>Δεν υπάρχουν στατιστικά για την συγκεκριμένη περίοδο!</Typography>}
            </>

          }
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default StatsPage;