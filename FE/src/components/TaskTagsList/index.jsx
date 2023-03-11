import React, { useEffect, useState } from "react";
import Tag from "../Tag";



const injectStateWithTags = (url , setTagList) => {
    fetch(url)
    .then(r => r.json)
    .then((r) => {
        setTagList(r);
    });
};

export default function TaskTagsList( listUrl ) {
    const [tagList, setTagList] = useState([]);
    injectStateWithTags(listUrl, setTagList);
    let list;
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        list =  tagList.map(e => {
            // eslint-disable-next-line react/jsx-key
            return <Tag tagText={e.name} color={e.color}></Tag>;
          });
    });

    return (
        <div className="task-tagslist">
           {list}
        </div>
    );
}