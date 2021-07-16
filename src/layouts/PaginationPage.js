import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { makeStyles, Grid } from "@material-ui/core"
import style from "../assets/jss/layouts/paginationPageStyle"
import { Pagination } from "@material-ui/lab"
import useQuery from "../hooks/useQuery"
import ItemsList from "../components/ItemsList"
import useItemsIDs from "../hooks/useItemsIDs"
import PropTypes from "prop-types"
import LoadingScene from "../components/LoadingScene"

const useStyles = makeStyles(style);

function PaginationPage(props) {
    const classes = useStyles();
    const query = Number(useQuery().get("page"));
    const history = useHistory();
    const {totalPages: pageCount, items} = useItemsIDs(props.fetchURL, query-1, 20);
    const {items: nextItems} = useItemsIDs(props.fetchURL, query, 20);
    
    useEffect(() => {
        if (!query){
            history.replace(`${props.path}?page=1`)
        }
        if (pageCount){
            if (query < 1 || query > pageCount){
                history.replace(`${props.path}?page=1`)
            }
        }
    }, [pageCount, query, history, props.path])

    const handleChange = (event, value) => {
        history.push(`${props.path}?page=${value}`);
    }
    
    return (
        <React.Fragment>
            {(query > 0 && query <= pageCount) ?
                <Grid container className={classes.grid} justify="center">
                    <Grid item xs={12} md={9}>
                        <div className={classes.paginationContainer}>
                            <Pagination 
                                    count={pageCount || 10} 
                                    page={query} 
                                    color="secondary" 
                                    onChange={handleChange}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={9} className={classes.list}>
                        <React.Fragment>
                            <ItemsList items={items} size={20} type={props.path} />
                            <div className={classes.hiddenPreload}><ItemsList items={nextItems} size={20} type={props.path} /></div>
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
                </Grid> : 
                <LoadingScene fullScreen/>
            }
        </React.Fragment>
    )
}

PaginationPage.propTypes = {
    path: PropTypes.string,
    fetchURL: PropTypes.string
}

export default PaginationPage;