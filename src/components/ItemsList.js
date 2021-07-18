import React from "react"
import ArtistCard from "./ArtistCard"
import { makeStyles } from "@material-ui/core"
import style from "../assets/jss/components/itemsListStyle"
import PropTypes from "prop-types"
import LoadingScene from "./LoadingScene"
import clsx from "clsx"
import ShowCard from "./ShowCard"

const useStyles = makeStyles(style);

function ItemsList(props){
    const classes = useStyles();

    return (
        <div className={clsx(classes.container, {
            [classes.isLoading]: !props.items
        })}>
            {props.title && <h1 style={{width: "100%"}}>Artists</h1>}
            {props.items ?
                props.items.map((item, index) => {
                    if (props.type === "/artists")
                        return (
                            <ArtistCard 
                                id={item.id}
                                key={index}
                                role={props.role && item.role}/>
                        )
                    else if (props.type === "/shows")
                        return (
                            <ShowCard id={item.id} key={index}/>
                        )
                    return null;
                })
                 :
                <LoadingScene />
            }
        </div>
    )
}

ItemsList.propTypes = {
    type: PropTypes.string.isRequired,
    items: PropTypes.array,
    role: PropTypes.bool,
    title: PropTypes.bool
}

export default ItemsList;