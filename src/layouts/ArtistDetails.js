import React, { useState } from "react";
import { useParams } from "react-router-dom"
import useArtistData from "../hooks/useArtistData"
import { Slide } from "@material-ui/core"

function ArtistDetails(props) {
    const { id } = useParams();
    const [ data ] = useArtistData(undefined, undefined, id);
    const [ showData, setShowData ] = useState(false)

    return (
        <React.Fragment>
            <Slide 
                direction={data ? "left" : "right"}
                in={data ? false : true} 
                unmountOnExit
                onExited={() => {
                    setShowData(true)
                }}>
                <div style={{width: "100%", height: "calc(100vh - 64px)", backgroundColor: "gray", zIndex: 10}}>
                    <h1>loading...</h1>
                </div>
            </Slide>
                {showData && <div>
                    <h1>{data.fullName}</h1>
                    {data.productions.map((production, index) => 
                        <h2 key={index}>{production.title} - {production.role}</h2>
                    )}
                </div>}
        </React.Fragment>
    )
}

export default ArtistDetails;