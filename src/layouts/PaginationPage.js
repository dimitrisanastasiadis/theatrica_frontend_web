import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { makeStyles, Grid } from "@material-ui/core"
import style from "../assets/jss/layouts/paginationPageStyle"
import { Pagination } from "@material-ui/lab"
import useQuery from "../hooks/useQuery"
import ArtistsList from "../components/ArtistsList"
import useItemsIDs from "../hooks/useItemsIDs"
import PropTypes from "prop-types"

const useStyles = makeStyles(style);

function PaginationPage(props) {
    const classes = useStyles();
    const query = Number(useQuery().get("page"));
    const history = useHistory();
    const {totalPages: pageCount} = useItemsIDs(props.fetchURL, 0, 20);
    
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
        history.push(`${props.path}?page=${value}`);
        window.scrollTo(0, 0)
    }
    
    return (
        <React.Fragment>
            {(query > 0 && query <= pageCount) &&
                <Grid container className={classes.grid} justify="center">
                    <Grid item xs={12} md={9}>
                        <React.Fragment>
                            <ArtistsList page={query-1}/>
                            <div className={classes.hiddenPreload}><ArtistsList page={query}/></div>
                        </React.Fragment>
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
                </Grid>}
        </React.Fragment>
    )
}

PaginationPage.propTypes = {
    path: PropTypes.string,
    fetchURL: PropTypes.string
}

export default PaginationPage;