import React from "react"
import ArtistCard from "./ArtistCard"
import { makeStyles } from "@material-ui/core"
import style from "../assets/jss/components/itemsListStyle"
import LoadingScene from "./LoadingScene"
import clsx from "clsx"
import ShowCard from "./ShowCard"
import VenueCard from "./VenueCard"

const useStyles = makeStyles(style);

function ItemsList(props){
    const classes = useStyles();

    return (
        <div className={clsx(classes.container, {
            [classes.isLoading]: !props.items
        })}>
            {props.items ?
                props.items.map((item, index) => {
                    if (props.type === "/artists")
                        return (
                            <ArtistCard 
                                id={item.id}
                                fullName={item.fullName}
                                image={item.image}
                                key={index}
                                />
                        )
                    else if (props.type === "/shows")
                        return (
                            <ShowCard 
                                id={item.id}
                                title={item.title}
                                media={item.image}
                                key={index} 
                            />
                        )
                    else if (props.type === "/venues")
                        return (
                            <VenueCard
                                id={item.id}
                                title={item.title}
                                key={index}
                            />
                        )
                    return null;
                })
                 :
                <LoadingScene />
            }
        </div>
    )
}

export default ItemsList;