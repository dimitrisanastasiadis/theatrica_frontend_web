import { useEffect, useState } from "react";

export default function useFavoriteShow(id){
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("favoriteShows") === null){
        localStorage.setItem("favoriteShows", JSON.stringify([]));
    }else{
        const favoriteShows = JSON.parse(localStorage.favoriteShows);
        if (favoriteShows.includes(id)){
            setIsFavorite(true);
        }else{
          setIsFavorite(false);
        }
    }
  }, [id])

  useEffect(() => {
    let favoriteShows = JSON.parse(localStorage.favoriteShows);
    if (isFavorite){
        favoriteShows.push(id);
    }else{
        favoriteShows = favoriteShows.filter(item => item !== id);
    }
    localStorage.favoriteShows = JSON.stringify(favoriteShows);
  }, [isFavorite, id])

  return { isFavorite, setIsFavorite }
}