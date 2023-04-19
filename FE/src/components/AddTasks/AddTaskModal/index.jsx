import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAddBox } from "react-icons/md";
import { useAppContext } from "../../../context";
import { ErrorDisplay } from "../../ErrorDisplay";
import TagsContainer from "../../TagsList";
import {
  AddButton,
  AddButtonsDiv,
  AddDiffButton,
  AddModal,
  ButtonsContainer,
  CloseButton,
  ContainerInput,
  DateInput,
  DateTagdiv,
  Description,
  DescriptionContainer,
  DescriptionInput,
  ModalContainer,
  TitleInput
} from "./style";

export default function AddTaskModal({
  closeHandler,
  modalVisible,
  dispatch,
  tagsList,
  setTagsList,
}) {
  const [editMode, setEditMode] = useState(true);
  const titleInput = useRef();
  const dateInput = useRef();
  const descriptionInput = useRef();
  const [error, setError] = useState("");
  const theme = useAppContext().themeMode;

  const reset = () => {
    titleInput.current.value = "";
    dateInput.current.value = "";
    descriptionInput.current.value = "";
  };
  const addValue = (type) => {
    const title = titleInput.current.value;
    const date = dateInput.current.value;

    if (title === "") {
      setError("Title must not be empty");
      return;
    }

    if (date !== "" && Date.parse(date) < Date.now()) {
      setError("Choose a valid date");
      return;
    }

    dispatch({
      type: type,
      value: {
        title: title,
        date: date,
        description: descriptionInput.current.value,
      },
    });
  };

  return (
    <AddModal theme={theme} display={modalVisible}>
      <CloseButton
        theme={theme}
        onClick={() => {
          closeHandler();
          setError("");
        }}
      >
        <AiOutlineClose color="white" size={24} />
      </CloseButton>
      <ModalContainer theme={theme}>
        <ErrorDisplay error={error}>{error}</ErrorDisplay>
        <TitleInput
          theme={theme}
          ref={titleInput}
          maxLength={12}
          type="text"
          placeholder="Task Title"
        />
        <ContainerInput>
          <DateTagdiv theme={theme}>
            <label>End Date:</label> <DateInput ref={dateInput} type="date" />
          </DateTagdiv>
          <DateTagdiv theme={theme}>
            <label>Tags:</label>
            <TagsContainer
              tagsList={tagsList}
              setTagsList={setTagsList}
              editMode={editMode}
              display={true}
              onDetail={false}
            />
          </DateTagdiv>
        </ContainerInput>
        <DescriptionContainer theme={theme}>
          <Description theme={theme}>Description</Description>
          <DescriptionInput
            theme={theme}
            ref={descriptionInput}
            placeholder="Write your task description here"
          />
        </DescriptionContainer>
        <ButtonsContainer theme={theme}>
          <AddButtonsDiv theme={theme}>
            <AddDiffButton
              theme={theme}
              onClick={() => {
                addValue("first");
                reset();
              }}
            >
              Add first
            </AddDiffButton>
            <AddDiffButton
              theme={theme}
              onClick={() => {
                addValue("");
                reset();
              }}
            >
              Add last
            </AddDiffButton>
            <AddDiffButton
              theme={theme}
              onClick={() => {
                addValue("random");
                reset();
              }}
            >
              Add random
            </AddDiffButton>
          </AddButtonsDiv>
          <AddButton
            theme={theme}
            onClick={() => {
              addValue("");
              reset();
            }}
          >
            Add Task
            <MdOutlineAddBox size={24} color="white" />
          </AddButton>
        </ButtonsContainer>
      </ModalContainer>
    </AddModal>
  );
}
