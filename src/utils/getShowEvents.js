export default function getShowEvents(events) {
  let pastEvents = [];
  let upcomingEvents = [];

  if (events){
    events.forEach(event => {
        const date = new Date(event.date);
        event.stringDate = date.toLocaleDateString("el", {weekday: "long", day: "numeric", month: "long", year: "numeric"});
        event.time = date.toLocaleTimeString("el", {hour: "numeric", minute: "numeric", hour12: false});
        event.year = date.getFullYear();
        if (event.date > Date.now()){
            upcomingEvents.push(event);
        }else{
            pastEvents.push(event);
        }
    })
    pastEvents.sort((a, b) => {
        return b.date - a.date;
    })
  }
  
  return { pastEvents, upcomingEvents }
}