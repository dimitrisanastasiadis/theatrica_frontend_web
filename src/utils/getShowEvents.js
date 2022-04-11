export default function getShowEvents(events) {
  let pastEvents = [];
  let upcomingEvents = [];
  let range = null;

  if (events) {
    events.forEach(event => {
      const date = new Date(event.date);
      event.stringDate = date.toLocaleDateString("el", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      event.time = date.toLocaleTimeString("el", { hour: "numeric", minute: "numeric", hour12: false });
      event.year = date.getFullYear();
      if (event.date > Date.now()) {
        upcomingEvents.push(event);
      } else {
        pastEvents.push(event);
      }
    })
    pastEvents.sort((a, b) => {
      return b.date - a.date;
    })

    if (pastEvents.length > 0 && upcomingEvents.length < 1) {
      range = pastEvents[pastEvents.length - 1].year
    } else if (upcomingEvents.length > 0 && pastEvents.length < 1) {
      range = upcomingEvents[upcomingEvents.length - 1].year
    } else if (upcomingEvents.length > 0 && pastEvents.length > 0) {
      if (pastEvents[pastEvents.length - 1].year !== upcomingEvents[upcomingEvents.length - 1].year) {
        range = `${pastEvents[pastEvents.length - 1].year} - ${upcomingEvents[upcomingEvents.length - 1].year}`
      } else {
        range = pastEvents[pastEvents.length - 1].year
      }
    }
  }



  return { pastEvents, upcomingEvents, range }
}