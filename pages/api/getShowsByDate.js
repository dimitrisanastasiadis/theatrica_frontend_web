import { mainFetcher } from "../../src/utils/AxiosInstances"
import events from "../../public/eventsVeryNew.json"
import isSameDay from 'date-fns/isSameDay'

const handler = async (req, res) => {
  const date = new Date(req.body.date)

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.DateEvent)
    if (isSameDay(date, eventDate)) {
      return true;
    }
  })

  const showsByVenueMap = new Map()

  filteredEvents.forEach(event => {
    if (!showsByVenueMap.has(event.VenueID)){
      showsByVenueMap.set(event.VenueID, [event.ProductionID])
    } else {
      if (!showsByVenueMap.get(event.VenueID).includes(event.ProductionID)){
        showsByVenueMap.get(event.VenueID).push(event.ProductionID)
      }
    }
  })

  let showsByVenue = Array.from(showsByVenueMap, venue => {
    return {
      id: venue[0],
      shows: venue[1]
    }
  })

  showsByVenue = await Promise.all(showsByVenue.map(async venue => {
    const theater = await mainFetcher(`/venues/${venue.id}`)
    venue.shows = await Promise.all(venue.shows.map(async show => {
      const production = await mainFetcher(`/productions/${show}`)
      return {
        id: show,
        name: production.title
      }
    }))

    return {
      ...venue,
      name: theater.title
    }
  }))

    res.status(200).json(showsByVenue)
}

export default handler;