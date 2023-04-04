import React, { useEffect, useState } from "react";
import { Container, Titles, TagsBox, ButtonsBox, Buttons, Tags } from "./style";
import { useAppContext, useTaskListContext } from "../../context";
import Tag from "../Tag";
import tagFetcher from "../../fetchers/fetchTags";

export default function LeftMenu() {
  const tasksList = useTaskListContext();
  const user = useAppContext();
  const list = tasksList.list;
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (user.currentUser === undefined) setTags([]);
    tagFetcher(user.currentUser?.userId).then((res) => setTags(res));
  }, [list, user.currentUser]);

  useEffect(() => {
    const sendData = setTimeout(() => {
      const data = createPatchDTO(list);
      fetch("http://localhost:8086/todo/tasks/v1/change-position", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: data,
      });
    }, 3000);

    return () => clearTimeout(sendData);
  }, [list]);

  const showTags = () => {
    return tags.map((t, i) => (
      <Tags key={i} tagColor={t.color}>
        {t.name}
      </Tags>
    ));
  };

  const removeAll = () => {
    tasksList.setTaskList([]);
  };
  const removeFirst = () => {
    tasksList.deleteTaskFromContext(list[0].taskId);
  };
  const removeLast = () => {
    tasksList.deleteTaskFromContext(list[list.length - 1].taskId);
  };
  const removeRandom = () => {
    tasksList.deleteTaskFromContext(
      list[Math.floor(Math.random() * (list.length - 1 - 0 + 1) + 0)]
        .taskId
    );
  };
  const removeDuplicates = () => {
    tasksList.setTaskList(
      list.filter(
        (obj, index, self) =>
          index === self.findIndex((o) => o.title === obj.title)
      )
    );
  };

  const randomize = () => {
    tasksList.setTaskList([...list].sort(() => Math.random() - 0.5));
  };
  const alphabetically = () => {
    tasksList.setTaskList(
      [...list].sort((a, b) => a.title.localeCompare(b.title))
    );
  };
  const notAlphabetically = () => {
    tasksList.setTaskList(
      [...list].sort((a, b) => b.title.localeCompare(a.title))
    );
  };

  return (
    <Container>
      <Titles>Filter</Titles>
      <TagsBox>{showTags()}</TagsBox>
      <Titles>Remove</Titles>
      <ButtonsBox>
        <Buttons onClick={removeAll}>Remove All</Buttons>
        <Buttons onClick={removeFirst}>Remove First</Buttons>
        <Buttons onClick={removeLast}>Remove Last</Buttons>
        <Buttons onClick={removeRandom}>Remove Random</Buttons>
        <Buttons onClick={removeDuplicates}>Remove Duplicates</Buttons>
      </ButtonsBox>
      <Titles>Sort</Titles>
      <ButtonsBox>
        <Buttons onClick={randomize}>Randomize</Buttons>
        <Buttons onClick={alphabetically}>Alphabetically</Buttons>
        <Buttons onClick={notAlphabetically}>Not Alphabetically</Buttons>
      </ButtonsBox>
    </Container>
  );
}

function createPatchDTO(updatedList) {
  return updatedList.map((e) => {
    return {
      taskId: e.taskId,
      position: e.position,
      ParentId: e.parentId,
    };
  });
}
