import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAddBox } from "react-icons/md";
import { ErrorDisplay } from "../../ErrorDisplay";
import {
  AddButton, AddButtonsDiv, AddDiffButton, AddModal, ButtonsContainer, CloseButton, ContainerInput, DateInput, DateTagdiv, Description, DescriptionContainer, DescriptionInput, ModalContainer, TitleInput
} from "./style";

export default function AddTaskModal({
  closeHandler,
  addHandler,
  modalVisible,
  newTask,
  dispatch,
}) {
  const titleInput = useRef();
  const dateInput = useRef();
  const descriptionInput = useRef();
  const [error, setError] = useState("");
  const addValue = (type) => {
    const title = titleInput.current.value;
    const date = dateInput.current.value;

    if (title === "") {
      setError("Title must not be empty");
      return;
    }

    if (date !== "" && Date.parse(date) < Date.now()) {
      setError("choose a valid date");
      return;
    }
  };

  return (
    <AddModal display={modalVisible}>
      <CloseButton onClick={() => {
        closeHandler();
        setError("");
      }}>
        <AiOutlineClose color="white" size={24} />
      </CloseButton>
      <ModalContainer>
        <ErrorDisplay error={error}>{error}</ErrorDisplay>
        <TitleInput ref={titleInput} type="text" placeholder="Task Title" />
        <ContainerInput>
          <DateTagdiv>
            End Date: <DateInput ref={dateInput} type="date" />
          </DateTagdiv>
          <DateTagdiv>Tags:</DateTagdiv>
        </ContainerInput>
        <DescriptionContainer>
          <Description>Description</Description>
          <DescriptionInput
            ref={descriptionInput}
            placeholder="Write your task description here"
          />
        </DescriptionContainer>
        <ButtonsContainer>
          <AddButtonsDiv>
            <AddDiffButton
              onClick={() => {
                addValue("first");
              }}>
              Add first
            </AddDiffButton>
            <AddDiffButton
              onClick={() => {
                addValue("");
              }}>
              Add last
            </AddDiffButton>
            <AddDiffButton
              onClick={() => {
                addValue("random");
              }}>
              Add random
            </AddDiffButton>
          </AddButtonsDiv>
          <AddButton
            onClick={() => {
              addValue("");
            }}
          >
            Add Task
            <MdOutlineAddBox size={24} color="white" />
          </AddButton>
        </ButtonsContainer>
      </ModalContainer>
    </AddModal >
  );
}
