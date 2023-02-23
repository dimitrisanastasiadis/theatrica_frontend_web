import { makeStyles, Typography } from "@material-ui/core"
import style from "../assets/jss/components/newsCardStyle"
import Image from "next/image"
import { useState } from "react"

const useStyles = makeStyles(style)

const NewsCard = ({ article }) => {
  const classes = useStyles()
  const [imageSrc, setImageSrc] = useState(article.urlToImage)

  return (
    <a href={article.url} className="linksNoDecoration">
      <div className={classes.container}>
        <div className={classes.imageWrapper}>
          <Image onError={() => setImageSrc("/DefaultShowImage.jpg")} src={imageSrc} alt={`${article.title} Thumbnail`} layout="fill" objectFit="cover" />
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