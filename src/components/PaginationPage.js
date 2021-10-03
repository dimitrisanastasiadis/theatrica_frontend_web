import { makeStyles, Grid } from "@material-ui/core"
import style from "../assets/jss/layouts/paginationPageStyle"
import { Pagination } from "@material-ui/lab"
import ItemsList from "./ItemsList"
import PropTypes from "prop-types"
import { useRouter } from "next/router"

const useStyles = makeStyles(style);

function PaginationPage({ items, pageCount, page, path }) {
    const classes = useStyles();
    const router = useRouter();

    const handleChange = (event, value) => {
        router.push(`${path}?page=${value}`);
    }

    return (
        <Grid container className={classes.grid} justify="center">
            <Grid item xs={12} md={9}>
                <div className={classes.paginationContainer}>
                    <Pagination 
                        count={pageCount || 10} 
                        page={page} 
                        color="secondary" 
                        onChange={handleChange}
                    />
                </div>
            </Grid>
            <Grid item xs={12} md={9} className={classes.list}>
                <ItemsList items={items} type={path} />
            </Grid>
            <Grid item xs={12} md={9}>
                <div className={classes.paginationContainer}>
                    <Pagination 
                        count={pageCount || 10} 
                        page={page} 
                        color="secondary" 
                        onChange={handleChange}/>
                </div>
            </Grid>
        </Grid>
    )
}
    
    

PaginationPage.propTypes = {
    path: PropTypes.string,
    items: PropTypes.array,
    pageCount: PropTypes.number,
    page: PropTypes.number
}

export default PaginationPage;