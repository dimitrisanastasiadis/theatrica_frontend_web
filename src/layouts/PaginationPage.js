import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { makeStyles, Grid } from "@material-ui/core"
import style from "../assets/jss/layouts/paginationPageStyle"
import { Pagination } from "@material-ui/lab"
import axios from "axios"
import useQuery from "../hooks/useQuery"
import ArtistsList from "../components/ArtistsList"

const useStyles = makeStyles(style);

function PaginationPage(props) {
    const classes = useStyles();
    const query = Number(useQuery().get("page"));
    const [ pageCount, setPageCount ] = useState(0);
    const history = useHistory();
    
    useEffect(() => {
        let isMounted = true;
        
        const getPageCount = async () => {
            try {
              const response = await axios.get(props.fetchURL);
              const items = response.data.data;
              if(isMounted){
                setPageCount(Math.ceil(items.length / 20));
              }
            } catch (error) {
              console.error(error);
            }
        }

        getPageCount();

        return () => {
            isMounted = false;
        }
    },[props.fetchURL])

    useEffect(() => {
        if (!query){
            history.push(`${props.path}?page=1`)
        }
        if (pageCount){
            if (query < 1 || query > pageCount){
                history.push(`${props.path}?page=1`)
            }
        }
    }, [pageCount, query, history, props.path])

    const handleChange = (event, value) => {
        history.push(`/artists?page=${value}`);
        window.scrollTo(0, 0)
    }
    
    return (
        <Grid container className={classes.grid} justify="center">
            <Grid item xs={12} md={9}>
                <ArtistsList page={query}/>
            </Grid>
            <Grid item xs={12} md={9}>
                <div className={classes.paginationContainer}>
                    <Pagination 
                            count={pageCount || 10} 
                            page={query} 
                            color="secondary" 
                            onChange={handleChange}/>
                </div>
            </Grid>
        </Grid>
    )
}

export default PaginationPage;