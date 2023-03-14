import React, { useEffect, useState } from "react";
import Tag from "../Tag";



export default function TaskTagsList({listUrl}) {
    const [tagList, setTagList] = useState([]);
    
    useEffect(()=>{
        fetch(listUrl)
        .then(response => response.json())
        .then(response => setTagList(response));
    },[]);

    return <>

    </>

}