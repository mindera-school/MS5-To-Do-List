import React, { useEffect, useState } from "react";
import Tag from "../Tag";


//Creates a div to hold every tag that corresponds to the task it's fathered by
export default function TaskTagsList({ listUrl }) {
  const [tagList, setTagList] = useState([]);
  let allTags;

  useEffect(() => {
    fetch(listUrl)
      .then((response) => response.json())
      .then((response) => setTagList(response));
  }, []);

  allTags = tagList?.map((e, i) => {
    return <Tag  key={i} tagText={e.name} color={e.color}></Tag>;
  });

  return <>
  <div className="task-tagslist">
    {allTags}
  </div>
  </>;
}
