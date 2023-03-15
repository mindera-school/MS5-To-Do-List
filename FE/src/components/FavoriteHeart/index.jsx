import React, { useState } from "react";

export default function FavoriteHeart({ isFavorite}) {
  const [isFilled, setIsFilled] = useState(isFavorite);

  const getHeartClass = () => {
    return isFilled ? "heart--filled" : "heart--empty";
  };

  return <button id="heart" className={getHeartClass()} onClick={()=> {
    isFilled?setIsFilled(false):setIsFilled(true);
  }} ></button>;
}
