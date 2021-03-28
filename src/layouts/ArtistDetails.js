import React from "react";
import { useParams } from "react-router-dom"
import useArtistData from "../hooks/useArtistData"

function ArtistDetails(props) {
    const { id } = useParams();
    const data = useArtistData(id);
    
    return (
        <React.Fragment>
            {data && <div>
                <h1>{data.fullName}</h1>
                {data.productions && 
                    data.productions.map((production, index) => 
                    <h2 key={index}>{production.title} - {production.role}</h2>
                )}
            </div>}
        </React.Fragment>
    )
}

export default ArtistDetails;