import React from "react"
import { useParams } from "react-router-dom"

function ShowDetails(props) {
    const { id } = useParams();

    return (
        <h1>This is the page of the show with id: {id}</h1>
    )
}

export default ShowDetails;