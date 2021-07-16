import React, { useState } from "react"
import { useParams } from "react-router-dom"
import useShowData from "../hooks/useShowData"
import { Grid, makeStyles, Typography, Paper, Tab, Tabs, AppBar, Table, TableBody, TableRow, TableCell, TableContainer, Toolbar } from "@material-ui/core"
import style from "../assets/jss/layouts/showDetailsStyle"
import he from "he"
import ItemsList from "../components/ItemsList"
import LoadingScene from "../components/LoadingScene"

const useStyles = makeStyles(style);

function TabPanel(props) {
    return (
      <div
        hidden={props.value !== props.index}
        {... props}>
        {props.value === props.index &&
            props.children}
      </div>
    );
}

function ShowDetails(props) {
    const classes = useStyles();
    const { id } = useParams();
    const data = useShowData(id);
    const [tabValue, setTabValue] = useState(0);

    let description;

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    } 

    if (data){
        description = data.description.split("\n");
    }

    return (
    <React.Fragment>
            {data ?
                <React.Fragment>
                    <Grid container className={classes.grid} justify="center">
                        <Grid item xs={12} md={9} className={classes.title}>
                            <Typography variant="h3" component="h1">{data.title}</Typography>
                        </Grid>
                        <Grid item xs={12} md={9} className={classes.imageGrid}>
                            {
                                data.media &&
                                    <img src={data.media} alt={data.title} className={classes.image} />
                            }
                            
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Paper elevation={6} style={{padding: 10}}>
                                <Paper className={classes.paper2}>
                                    <AppBar position="static" color="default" className={classes.appBar}>
                                        <Tabs 
                                            value={tabValue}
                                            onChange={handleTabChange}
                                            indicatorColor="secondary"
                                            textColor="secondary"
                                            variant="scrollable"
                                            scrollButtons="auto">
                                            <Tab label="ΠΕΡΙΓΡΑΦΗ" />
                                            <Tab label="ΣΥΝΤΕΛΕΣΤΕΣ" />
                                            <Tab label="ΕΚΔΗΛΩΣΕΙΣ" />
                                        </Tabs>
                                    </AppBar>
                                    <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
                                    {
                                        description.map((sentence, index) => 
                                            <Typography key={index} paragraph variant="body1" style={{wordWrap: "break-word"}}>{he.decode(sentence)} </Typography>
                                        )
                                    }
                                    </TabPanel>
                                    <TabPanel value={tabValue} index={1}>
                                        <ItemsList items={data.people} size={20} role title={false} type="/artists"/>
                                    </TabPanel>
                                    <TabPanel value={tabValue} index={2} className={classes.tabPanel}>
                                        <AppBar position="static">
                                            <Toolbar>
                                                <Typography variant="h6">Προσεχώς</Typography>
                                            </Toolbar>
                                        </AppBar>
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableBody>
                                                    {data.upcomingEvents.length ? data.upcomingEvents.map((event, index) => 
                                                        <TableRow hover key={index} className={classes.tableRow}>
                                                            <TableCell>
                                                                <Typography>{event.stringDate}</Typography>
                                                                <Typography>{event.time}</Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography>{event.title}</Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography>{event.priceRange}</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : <TableRow className={classes.tableRow}>
                                                            <TableCell>
                                                                <Typography>Δεν υπάρχουν εκδηλώσεις</Typography>
                                                            </TableCell>
                                                        </TableRow>}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <AppBar position="static"  style={{marginTop: 50}}>
                                                <Toolbar>
                                                    <Typography variant="h6">Ιστορικό Εκδηλώσεων</Typography>
                                                </Toolbar>
                                        </AppBar>
                                        <TableContainer component={Paper}>
                                        <Table>
                                                <TableBody>
                                                    {data.pastEvents.length ? data.pastEvents.map((event, index) => 
                                                        <TableRow hover key={index} className={classes.tableRow}>
                                                            <TableCell>
                                                                <Typography>{event.stringDate}</Typography>
                                                                <Typography>{event.time}</Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography>{event.title}</Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography>{event.priceRange}</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : <TableRow className={classes.tableRow}>
                                                            <TableCell>
                                                                <Typography>Δεν υπάρχουν εκδηλώσεις</Typography>
                                                            </TableCell>
                                                        </TableRow>}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                </Paper>
                            </Paper>
                        </Grid>
                    </Grid>
                </React.Fragment> :
                <LoadingScene fullScreen/>
            }
        </React.Fragment>
        
    )
}

export default ShowDetails;