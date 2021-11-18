import { useEffect, useState } from "react";

export default function useFavoriteShow(id){
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("favoriteVenues") === null){
        localStorage.setItem("favoriteVenues", JSON.stringify([]));
    }else{
        const favoriteVenues = JSON.parse(localStorage.favoriteVenues);
        if (favoriteVenues.includes(id)){
            setIsFavorite(true);
        }else{
          setIsFavorite(false);
        }
    }
  }, [id])

  useEffect(() => {
    let favoriteVenues = JSON.parse(localStorage.favoriteVenues);
    if (isFavorite){
        favoriteVenues.push(id);
    }else{
        favoriteVenues = favoriteVenues.filter(item => item !== id);
    }
    localStorage.favoriteVenues = JSON.stringify(favoriteVenues);
  }, [isFavorite, id])

  return { isFavorite, setIsFavorite }
}