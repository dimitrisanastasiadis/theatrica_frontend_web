import React, { useEffect} from "react"
import axios from "axios"
import ArtistCard from "../components/ArtistCard"
import { makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import style from "../assets/jss/components/artistsListStyle"
import { Skeleton } from "@material-ui/lab"

const useStyles = makeStyles(style);

function ArtistsList(props){
    const classes = useStyles();
    const theme = useTheme();
    const [ artistData, setArtistData ] = React.useState([]);
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    const loadingSkeletons = Array(20).fill(
        <div>
            <Skeleton variant="circle" width={isSmUp ? 180 : 135} height={isSmUp ? 180 : 135} />
            <Typography variant="body1">
                <Skeleton />
            </Typography>
            <Typography variant="body2">
                <Skeleton />
            </Typography>
        </div>
    )

    useEffect(() => {
        let isMounted = true;
        setArtistData([]);
        const getData = async () => {
            try {
              const response = await axios.get(`http://192.168.2.9:8080/api/people?page=${props.page}&size=20`);
              const artists = response.data.data;
              let responseProductions
              await Promise.all(
                  artists.map(async (artist, index) => {
                    responseProductions = await axios.get(`http://192.168.2.9:8080/api/people/${artist.id}/productions`);
                    artists[index].productions = responseProductions.data.data;
                  })
              )
              if (isMounted){
                setArtistData(artists);
              }
            } catch (error) {
              console.error(error);
            }
        }
        if (props.page){
            getData();
        }

        return () => {
            isMounted = false;
        }
    }, [props.page])

    return (
        <React.Fragment>
            <h1>Artists</h1>
            <div className={classes.container}>
                {artistData.length ?
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

export default ArtistsList;