import React from "react";
import { makeStyles, Typography, Avatar, useMediaQuery, useTheme } from "@material-ui/core";
import style from "../assets/jss/components/artistCardStyle";
import Image from "next/image"
import Link from "next/link"

const useStyles = makeStyles(style);

function ArtistCard({ id, fullName, image }) {
    const classes = useStyles();
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <React.Fragment>
            <Link href={`/artists/${id}`}>
                <a className="linksNoDecoration">
                    <div className={classes.container}>
                        <Avatar className={`${classes.avatar} ${image && classes.transparent}`} alt="Artist Photo">
                            {image ? 
                                <Image src={image} alt="Artist Photo" width={300} height={450} /> : null
                            }
                        </Avatar>
                        <Typography variant="body1" component="p" className={classes.name}>{fullName}</Typography>
                    </div>
                </a>
            </Link>
        </React.Fragment>
    )
}

export default ArtistCard;