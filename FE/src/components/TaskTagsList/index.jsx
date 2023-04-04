import React, { useEffect, useState } from "react";
import taskTagsFetcher from "../../fetchers/fetchTaskTags.js";
import Tag from "../Tag";
import { StylesTaskTagsList } from "./styled-components.js";

//Creates a div to hold every tag that corresponds to the task it's fathered by
export default function TaskTagsList({ listUrl }) {
  const [tagList, setTagList] = useState([]);
  let allTags;

  useEffect(() => {
    if (listUrl?.length === 0 || listUrl === undefined) {
      return;
    }
    taskTagsFetcher(listUrl).then((res) => setTagList(res));
  }, [listUrl]);

  allTags = tagList?.map((e, i) => {
    return (
      <Tag
        key={i}
        tagText={e.name}
        color={e.color}
        height={"20px"}
        width={"75px"}
      ></Tag>
    );
  });

  return (
    <>
      <StylesTaskTagsList>{allTags}</StylesTaskTagsList>
    </>
  );
}
