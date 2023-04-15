import React, { useEffect, useState } from "react";
import { BsChevronBarUp } from "react-icons/bs";
import { useAppContext, useTaskListContext } from "../../context";
import tagFetcher from "../../fetchers/fetchTags";
import { Buttons, ButtonsBox, Container, MobileOpenBtn, Tags, TagsBox, Titles } from "./style";

export default function LeftMenu() {
  const tasksList = useTaskListContext();
  const user = useAppContext();
  const list = tasksList.list;
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const theme = useAppContext().themeMode;
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    if (user.currentUser === null) {
      setTags([]);
      return;
    }
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
        body: JSON.stringify(data),
      });
    }, 3000);

    return () => clearTimeout(sendData);
  }, [list]);

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

  const showTags = () => {
    const uniqueTags = tags.filter(
      (tag, index, self) =>
        index === self.findIndex((t) => t.name === tag.name)
    );

    return uniqueTags.map((t, i) => (
      <Tags
        onClick={() => {
          setSelectedTag(t === selectedTag ? null : t);
        }}
        key={i}
        tagColor={t.color}
        active={t === selectedTag}
      >
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
      list[Math.floor(Math.random() * (list.length - 1 - 0 + 1) + 0)].taskId
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
    <Container theme={theme} open={open}>
      <MobileOpenBtn open={open} onClick={() => { setIsOpen(open ? false : true); }}>
        <BsChevronBarUp size={30} />
      </MobileOpenBtn>
      <Titles theme={theme}>Filter</Titles>
      <TagsBox theme={theme}>{showTags()}</TagsBox>
      <Titles theme={theme}>Remove</Titles>
      <ButtonsBox theme={theme}>
        <Buttons theme={theme} onClick={removeAll}>Remove All</Buttons>
        <Buttons theme={theme} onClick={removeFirst}>Remove First</Buttons>
        <Buttons theme={theme} onClick={removeLast}>Remove Last</Buttons>
        <Buttons theme={theme} onClick={removeRandom}>Remove Random</Buttons>
        <Buttons theme={theme} onClick={removeDuplicates}>Remove Duplicates</Buttons>
      </ButtonsBox>
      <Titles>Sort</Titles>
      <ButtonsBox theme={theme}>
        <Buttons theme={theme} onClick={randomize}>Randomize</Buttons>
        <Buttons theme={theme} onClick={alphabetically}>Alphabetically</Buttons>
        <Buttons theme={theme} onClick={notAlphabetically}>Not Alphabetically</Buttons>
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
