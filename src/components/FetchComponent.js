import { useEffect, useState } from "react";
import useSWR from "swr";
import getShowImage from "../utils/getShowImage"

const FetchComponent = ({ Component, id }) => {
  const [path, setPath] = useState("")
  const [props, setProps] = useState({})
  const { data } = useSWR(path ? `/${path}/${id}` : null)

  useEffect(() => {
    if (Component.name === "ArtistCard")
      setPath("people")
    else if (Component.name === "ShowCard")
      setPath("productions")
    else if (Component.name === "VenueCard")
      setPath("venues")
  }, [Component.name])

  useEffect(() => {
    if (data) {
      const props = {
        id: data.id
      }
      if (path === "people") {
        props.fullName = data.fullName
        props.image = data.image
        
      } else if (path === "productions") {
        props.title = data.title
        props.media = getShowImage(data.mediaURL)
      } else if (path === "venues") {
        props.title = data.title
      }
      setProps(props)
    }
  }, [data, path])

  return (
    data ?
      <Component {...props} /> : null
  );
}

export default FetchComponent;