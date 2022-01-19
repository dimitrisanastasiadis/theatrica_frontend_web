import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { useEffect, useState } from "react"
import { DatePickerTheme } from "../../src/assets/themes/DarkTheme"
import { ThemeProvider, makeStyles, Typography, Radio, FormControlLabel } from "@material-ui/core"
import style from "../../src/assets/jss/layouts/statsPageStyle"
import events from "../../public/eventsNew.json"
import { TimeRange } from '@nivo/calendar'
import grLocale from "date-fns/locale/el"
import { useRouter } from "next/router"
import endOfMonth from 'date-fns/endOfMonth'
import { ResponsivePie } from "@nivo/pie"

const useStyles = makeStyles(style);

const calendarTheme = ({
  textColor: "#fff",
  tooltip: {
    container: {
      background : "#373737"
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

  const eventsMap = new Map();
  const eventsMapMonths = new Map();

  filteredEvents.forEach(event => {
    const eventDate = new Date(event.DateEvent)
    const isoDate = eventDate.toISOString().split('T')[0]

    if (!eventsMap.has(isoDate)) {
      eventsMap.set(isoDate, { value: 1 })
    } else {
      eventsMap.get(isoDate).value++
    }

    if (!eventsMapMonths.has(eventDate.getMonth())) {
      eventsMapMonths.set(eventDate.getMonth(), { value: 1 })
    } else {
      eventsMapMonths.get(eventDate.getMonth()).value++
    }


  })

  const eventsByDate = Array.from(eventsMap, event => {
    return {
      day: event[0],
      value: event[1].value
    }
  })

  const eventsByMonth = Array.from(eventsMapMonths, month => {
    return {
      id: months[month[0]],
      value: month[1].value
    }
  })

  return {
    props: {
      eventsByDate,
      eventsByMonth
    }
  }
}

const Tooltip = ({ value, date }) => {
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

const StatsPage = ({ eventsByDate, eventsByMonth }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mode, setMode] = useState("year")
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

  useEffect(() => {
    if (!router.query.year) {
      router.push(`/stats?year=${selectedDate.getFullYear()}`)
    }
  }, [router, selectedDate])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={grLocale}>
      <div className="pageWrapper">
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
                tooltip={Tooltip}
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
            <div className={classes.chartContainer}>
              <Typography variant="h3" component="h2">Εκδηλώσεις ανά Μήνα</Typography>  
              <ResponsivePie
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
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default StatsPage;