import React from "react";
import { useParams } from "react-router-dom"

function ArtistDetails(props) {
    const { id } = useParams();

    return (
        <React.Fragment>
            <h1>This is the artist details page with id: {id}</h1>
        </React.Fragment>
    )
}

export default ArtistDetails;