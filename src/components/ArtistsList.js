import React from "react"
import ArtistCard from "../components/ArtistCard"
import { makeStyles, Typography, useTheme, useMediaQuery } from "@material-ui/core"
import style from "../assets/jss/components/artistsListStyle"
import PropTypes from "prop-types"
import { Skeleton } from "@material-ui/lab"

const useStyles = makeStyles(style);

function ArtistsList(props){
    const classes = useStyles();
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    const loadingSkeletons = Array.from(Array(props.size), (_, index) => 
        <div key={index}>
            <Skeleton variant="circle" width={isSmUp ? 180 : 135} height={isSmUp ? 180 : 135} />
            <Typography variant="body1">
                <Skeleton />
            </Typography>
            <Typography variant="body2">
                <Skeleton />
            </Typography>
        </div>
    )

    return (
        <div className={classes.container}>
            {props.title && <h1 style={{width: "100%"}}>Artists</h1>}
            {props.items ?
                props.items.map((artist, index) => 
                <ArtistCard 
                    id={artist.id}
                    key={index}
                    role={props.role && artist.role}
                />) :
                loadingSkeletons.map(skeleton => skeleton)
            }
        </div>
    )
}

ArtistsList.propTypes = {
    items: PropTypes.array,
    size: PropTypes.number,
    role: PropTypes.bool,
    title: PropTypes.bool
}

export default ArtistsList;