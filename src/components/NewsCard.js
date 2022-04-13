import { makeStyles, Typography } from "@material-ui/core"
import style from "../assets/jss/components/newsCardStyle"
import Image from "next/image"

const useStyles = makeStyles(style)

const NewsCard = ({ article }) => {
  const classes = useStyles()

  return (
    <a href={article.url} className="linksNoDecoration">
      <div className={classes.container}>
        <div className={classes.imageWrapper}>
          <Image src={article.urlToImage} alt={`${article.title} Thumbnail`} layout="fill" objectFit="cover" />
        </div>
        <div className={classes.body}>
          <Typography variant="h4" component="h3">{article.title}</Typography>
          <Typography variant="body2">{article.description}</Typography>
        </div>
      </div>
    </a>
  );
}

export default NewsCard;