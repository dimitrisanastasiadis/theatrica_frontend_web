import React from "react"
import ArtistCard from "../components/ArtistCard"
import { makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import style from "../assets/jss/components/artistsListStyle"
import { Skeleton } from "@material-ui/lab"
import useArtistData from "../hooks/useArtistData"
import PropTypes from "prop-types"

const useStyles = makeStyles(style);

function ArtistsList(props){
    const classes = useStyles();
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
    const artistData = useArtistData(props.page, 20);

    const loadingSkeletons = Array.from(Array(20), (_, index) => 
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
        <React.Fragment>
            
            <div className={classes.container}>
                <h1 style={{width: "100%"}}>Artists</h1>
                {artistData ?
                    artistData.map((artist, index) => 
                    <ArtistCard 
                        id={artist.id}
                        key={index}
                        name={artist.fullName}
                        play={artist.productions.length ? artist.productions[0].title : ""}
                        delay={0}
                    />) : 
                    loadingSkeletons.map(skeleton => skeleton)
                }
            </div>
        </React.Fragment>
    )
}

ArtistsList.propTypes = {
    page: PropTypes.number
}

export default ArtistsList;