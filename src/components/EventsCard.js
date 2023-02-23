import { makeStyles, Typography, Button } from "@material-ui/core";
import style from "../assets/jss/components/eventsCardStyle";
import Link from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles(style);

const EventsCard = ({ show }) => {
  const classes = useStyles();

  return ( 
    <div className={classes.cardContainer}>
      <div className={classes.itemPadding}>
        <Link href={`/shows/${show.id}`}>
          <a className={classes.link}>
            <Typography variant="h5" className={classes.showTitle}>{show.title}</Typography>
          </a>
        </Link>
      </div>
      {show.events.map((event, index) => {
        const eventDate = new Date(event.date);
        return (
          <div key={index} className={classes.events}>
            <div>
              <Typography variant="body1">{eventDate.toLocaleDateString("el", {day: "numeric", month: "long", year: "numeric"})}</Typography>
              <Typography variant="body1">{eventDate.toLocaleTimeString("el", {hour: "numeric", minute: "numeric", hour12: false})}</Typography>
            </div>
            <div>
            <Link href={`/venues/${event.venue.id}`}>
              <a className={classes.link}>
                <Typography variant="body1">{event.venue.title}</Typography>
              </a>
            </Link>
            </div>
            <div>
              <Typography variant="body1">{event.price}</Typography>
            </div>
          </div>
        )
      })}
      <div className={classes.itemPadding}>
        <div className={classes.duration}>
          <ScheduleIcon />
          <Typography variant="body1">{show.duration === "Not found" ? "N/A" : "N/A"}</Typography>
        </div>
        <Button
          component="a"
          target="_blank"
          href={show.url}
          color="secondary"
          variant="contained"
          endIcon={<FaExternalLinkAlt style={{fontSize: 16}} />}
          >ΕΙΣΙΤΗΡΙΑ
        </Button>
      </div>
    </div>
  )
}
 
export default EventsCard;