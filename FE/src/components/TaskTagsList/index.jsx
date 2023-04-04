import React, { useEffect, useState } from "react";
import taskTagsFetcher from "../../fetchers/fetchTaskTags.js";
import Tag from "../Tag";
import { useTaskListContext } from "../../context";

import { StylesTaskTagsList } from "./styled-components.js";

//Creates a div to hold every tag that corresponds to the task it's fathered by
export default function TaskTagsList({ listUrl }) {
  const tasksList = useTaskListContext();
  const list = tasksList.list;
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  let allTags;

  useEffect(() => {
    if (listUrl?.length === 0 || listUrl === undefined) {
      return;
    }
    taskTagsFetcher(listUrl).then((res) => setTagList(res));
  }, [listUrl]);

  useEffect(() => {
    if (selectedTag) {
      tasksList.setDisplayedTaskList(
        list.filter((task) =>
          task.tags.some((e) => e.name === selectedTag.name)
        )
      );
    } else {
      tasksList.setDisplayedTaskList(list);
    }
  }, [selectedTag, list]);

  allTags = tagList?.map((e, i) => {
    return (
      <Tag
        onClick={() => {
          setSelectedTag(e === selectedTag ? null : e);
        }}
        key={i}
        tagText={e.name}
        color={e.color}
        height={"20px"}
        width={"75px"}
        active={e === selectedTag}
      />
    );
  });

  return (
    <>
      <StylesTaskTagsList>{allTags}</StylesTaskTagsList>
    </>
  );
}
