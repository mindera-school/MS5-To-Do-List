import React, { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAddBox } from "react-icons/md";
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
  const addValue = (type) => {
    dispatch({
      type: type, value: {
        title: titleInput.current.value,
        description: descriptionInput.current.value,
        date: dateInput.current.value
      }
    });
    titleInput.current.value = "";
    descriptionInput.current.value = "";
    dateInput.current.value = "";
  };

  return (
    <AddModal display={modalVisible}>
      <CloseButton onClick={closeHandler}>
        <AiOutlineClose color="white" size={24} />
      </CloseButton>
      <ModalContainer>
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
