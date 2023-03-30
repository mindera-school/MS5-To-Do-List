import React, { useRef } from "react";
import {
  AddModal,
  CloseButton,
  TitleInput,
  DateInput,
  DescriptionInput,
  ContainerInput,
  AddDiffButton,
  AddButtonsDiv,
  AddButton,
  Description,
  ButtonsContainer,
  DateTagdiv,
  DescriptionContainer,
  ModalContainer,
} from "./style";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAddBox } from "react-icons/md";

export default function AddTaskModal({
  closeHandler,
  addHandler,
  modalVisible,
  newTask,
}) {
  const titleInput = useRef();
  const dateInput = useRef();
  const descriptionInput = useRef();
  const addValue = () => {
    newTask.title = titleInput.current.value;
    newTask.description = descriptionInput.current.value;
    newTask.date = dateInput.current.value;
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
            <AddDiffButton>Add first</AddDiffButton>
            <AddDiffButton>Add last</AddDiffButton>
            <AddDiffButton>Add random</AddDiffButton>
          </AddButtonsDiv>
          <AddButton
            onClick={() => {
              addValue();
              addHandler();
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