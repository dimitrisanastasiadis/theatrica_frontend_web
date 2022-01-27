import { useEffect, useState } from "react";
import useSWR from "swr";
import getShowImage from "../utils/getShowImage"
import ArtistCard from "./ArtistCard"
import VenueCard from "./VenueCard"
import ShowCard from "./ShowCard";
import { internalFetcherGet } from "../utils/AxiosInstances";

const FetchComponent = ({ path, id }) => {
  const [props, setProps] = useState({})
  const { data } = useSWR(path ? ['/api/fetchMask', path, id] : null, internalFetcherGet)

  let component;

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

  if (path === "people") {
    component = <ArtistCard {...props} />
  }else if (path === "productions"){
    component = <ShowCard {...props} />
  }else if (path === "venues"){
    component = <VenueCard {...props} />
  }
  

  return (
    data ? 
      component  :
     null
  );
}

export default FetchComponent;