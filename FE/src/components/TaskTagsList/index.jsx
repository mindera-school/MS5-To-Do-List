import React, { useEffect, useState } from "react";
import Tag from "../Tag";
import taskTagsFetcher from "../../fetchers/fetchTaskTags.js";

//Creates a div to hold every tag that corresponds to the task it's fathered by
export default function TaskTagsList({ listUrl }) {
  const [tagList, setTagList] = useState([]);
  let allTags;

  useEffect(() =>{taskTagsFetcher(listUrl).then((res) => setTagList(res))}, [listUrl]);

  allTags = tagList?.map((e, i) => {
    return <Tag key={i} tagText={e.name} color={e.color}></Tag>;
  });

  return (
    <>
      <div className="task-tagslist">{allTags}</div>
    </>
  );
}
