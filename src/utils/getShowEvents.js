import { months } from "./constants";

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

  const eventsByMonth = events.reduce((acc, event) => {
    const date = new Date(event.date);
    const month = months[date.getMonth()]
    const year = date.getFullYear();
    const monthYear = `${month} ${year}`;
    const existingMonthYear = acc.find(item => item.monthYear === monthYear);
    if (existingMonthYear) {
      existingMonthYear.numberOfShows++;
    } else {
      acc.push({ monthYear, numberOfShows: 1 });
    }
    return acc;
  }, []);

  const eventsByStartTime = events.reduce((acc, event) => {
    const time = event.time
    const existingTime = acc.find(item => item.time === time);
    if (existingTime) {
      existingTime.numberOfShows++;
    } else {
      acc.push({ time, numberOfShows: 1 });
    }
    return acc;
  }, []);

  eventsByStartTime.sort((a, b) => {
    let timeA = a.time.split(':');
    let timeB = b.time.split(':');
    let hoursA = parseInt(timeA[0]);
    let hoursB = parseInt(timeB[0]);
    let minutesA = parseInt(timeA[1]);
    let minutesB = parseInt(timeB[1]);
  
    if (hoursA !== hoursB) {
      return hoursA - hoursB;
    } else {
      return minutesA - minutesB;
    }
  });

  return { pastEvents, upcomingEvents, eventsByMonth, eventsByStartTime, range }
}