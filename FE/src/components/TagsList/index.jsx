import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context.js";
import Tag from "../Tag/index.jsx";
import { Container, AddTagButton, TempTag, CloseTag, TagInput } from "./style";
import { GrFormClose } from "react-icons/gr";

export default function TagsContainer({
  tagsList,
  setTagsList,
  editMode,
  taskId,
}) {
  const [tagsColors, setTagsColors] = useState([
    "red",
    "green",
    "blue",
    "purple",
    "#FF007F",
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isCloseButtonDisabled, setIsCloseButtonDisabled] = useState(false);
  const user = useAppContext();

  useEffect(() => {
    if (editMode === true) {
      setIsButtonDisabled(false);
      setIsCloseButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
      setIsCloseButtonDisabled(true);
    }
  }, [editMode]);

  useEffect(() => {
    setTagsColors(shuffleArray(tagsColors));
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
    const newTagColor = tagsList[tagsList.length - 1].color;
    setTagsList((prevTagsList) => [
      ...prevTagsList.slice(0, -1),
      {
        name: inputValue,
        color: newTagColor,
        taskId: taskId,
        userId: user.currentUser?.userId,
      },
    ]);
    setIsButtonDisabled(false);
  };

  const deleteTag = (index) => {
    setTagsList((prevArray) => prevArray.filter((_, i) => i !== index));
    setIsButtonDisabled(false);
  };

  const renderList = tagsList?.map((e, i) => {
    const color = e.color ?? tagsColors[i % tagsColors.length];
    if (e.input === true) {
      e.color = color;
      return (
        <TempTag key={i} tagColor={color}>
          <TagInput
            type="text"
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleInputKeyDown}
            maxLength={12}
          />
          <CloseTag
            onClick={() => deleteTag(i)}
            disabled={isCloseButtonDisabled}
          >
            <GrFormClose size={14} color="white" />
          </CloseTag>
        </TempTag>
      );
    }
    return (
      <Tag
        key={i}
        tagText={e.name}
        color={color}
        height={"20px"}
        width={"75px"}
        displayed={
          <CloseTag
            onClick={() => deleteTag(i)}
            disabled={isCloseButtonDisabled}
          >
            <GrFormClose size={14} color="white" />
          </CloseTag>
        }
      />
    );
  });

  const handler = () => {
    if (tagsList.length >= 3) return;
    setIsButtonDisabled(true);
    setTagsList([...tagsList, { name: "", input: true }]);
  };

  return (
    <Container>
      {renderList}
      <AddTagButton onClick={() => handler()} disabled={isButtonDisabled}>
        + Add Tag
      </AddTagButton>
    </Container>
  );
}
