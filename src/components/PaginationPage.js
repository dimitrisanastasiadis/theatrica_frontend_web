import { makeStyles, Grid, Typography } from "@material-ui/core"
import style from "../assets/jss/layouts/paginationPageStyle"
import { Pagination } from "@material-ui/lab"
import ItemsList from "./ItemsList"
import { useRouter } from "next/router"

const useStyles = makeStyles(style);

function PaginationPage({ items, pageCount, page, path, title }) {
    const classes = useStyles();
    const router = useRouter();

    const handleChange = (event, value) => {
        router.push({
            pathname: path,
            query: {
                ...router.query,
                page: value
            }
        })
    }

    return (
        <Grid container className={classes.grid} justify="center">
            {title &&
                <Grid item xs={12} >
                    <div className={classes.headingContainer}>
                        <Typography variant="h2" component="h1">{title}</Typography>
                    </div>
                </Grid>}
            <Grid item xs={12}  className={classes.list}>
                <ItemsList items={items} type={path} />
            </Grid>
            <Grid item xs={12} >
                <div className={classes.paginationContainer}>
                    <Pagination
                        count={pageCount || 10}
                        page={page}
                        color="secondary"
                        onChange={handleChange} />
                </div>
            </Grid>
        </Grid>
    )
}

export default PaginationPage;