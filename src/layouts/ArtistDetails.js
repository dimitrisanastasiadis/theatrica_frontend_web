import React from "react";
import { useParams, Link } from "react-router-dom"
import useArtistData from "../hooks/useArtistData"
import { Grid, makeStyles, Avatar, Paper, Typography, Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Divider } from "@material-ui/core"
import style from "../assets/jss/layouts/artistDetailsStyle"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import LoadingScene from "../components/LoadingScene";

const useStyles = makeStyles(style);

function ArtistDetails(props) {
    const classes = useStyles();
    const { id } = useParams();
    const data = useArtistData(id);
    let productionGroups = {};
    const [expanded, setExpanded] = React.useState("panel0");

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    if (data){
        if (data.productions){
            productionGroups = data.productions.reduce((r, a) => {
                r[a.role] = [...r[a.role] || [], a];
                return r;
               }, {});
        }
    }
    

    return (
        data ?
        <Grid container justify="center" className={classes.grid}>
            <Grid item xs={12} md={9} lg={7} className={classes.gridItem}>
                <Paper elevation={3} className={classes.card}>
                    <div className={classes.container}>
                        <Avatar src={data.image} variant="rounded" alt={`Photo of ${data.fullName}`} className={classes.avatar}/>
                        <div style={{overflow: "auto", textAlign: "center"}}>
                            <Typography variant="h4">{data.fullName}</Typography>
                        </div>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={9} lg={7} className={classes.gridItem}>
                <Paper elevation={3} className={classes.card}>
                        <Typography variant="h4">Θεατρικές Παραστάσεις</Typography>
                        <div className={classes.accordionContainer}>
                            {
                                Object.entries(productionGroups).map(([key, value], index) => 
                                    <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} className={classes.accordion}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel-${key}-content`}
                                        id={`panel-${key}-header`}>
                                            <Typography className={classes.categoryTitle} variant="h6">{key}</Typography>                                                
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <List style={{width: "100%"}}>
                                                {value.map((play, index) => 
                                                    <React.Fragment key={index}>
                                                        {index > 0 && <Divider/>}
                                                        <ListItem>
                                                            <Link to={`/shows/${play.productionId}`} className={classes.link}>
                                                                <ListItemText primary={play.title} />
                                                            </Link>
                                                        </ListItem>
                                                    </React.Fragment>
                                                )}
                                            </List>
                                            
                                            
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            }
                        </div>
                </Paper>
            </Grid>
        </Grid> :
        <LoadingScene fullScreen />
    )
}

export default ArtistDetails;