import React from "react";
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
  setModalVisible,
}) {
  return (
    <AddModal display={modalVisible}>
      <CloseButton onClick={closeHandler}>
        <AiOutlineClose color="white" size={24} />
      </CloseButton>
      <ModalContainer>
        <TitleInput type="text" placeholder="Task Title" />
        <ContainerInput>
          <DateTagdiv>
            End Date: <DateInput type="date" />
          </DateTagdiv>
          <DateTagdiv>Tags:</DateTagdiv>
        </ContainerInput>
        <DescriptionContainer>
          <Description>Description</Description>
          <DescriptionInput placeholder="Write your task description here" />
        </DescriptionContainer>
        <ButtonsContainer>
          <AddButtonsDiv>
            <AddDiffButton>Add first</AddDiffButton>
            <AddDiffButton>Add last</AddDiffButton>
            <AddDiffButton>Add random</AddDiffButton>
          </AddButtonsDiv>
          <AddButton onClick={addHandler}>
            Add Task
            <MdOutlineAddBox size={24} color="white" />
          </AddButton>
        </ButtonsContainer>
      </ModalContainer>
    </AddModal>
  );
}
