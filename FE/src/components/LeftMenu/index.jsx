import React from "react";
import { Container, Titles, TagsBox, ButtonsBox, Buttons } from "./style";

export default function LeftMenu() {
  return (
    <Container>
      <Titles>Filter</Titles>
      <TagsBox></TagsBox>
      <Titles>Remove</Titles>
      <ButtonsBox>
        <Buttons>Remove All</Buttons>
        <Buttons>Remove First</Buttons>
        <Buttons>Remove Last</Buttons>
        <Buttons>Remove Random</Buttons>
        <Buttons>Remove Duplicates</Buttons>
        <Buttons>Remove Even</Buttons>
      </ButtonsBox>
      <Titles>Sort</Titles>
      <ButtonsBox>
        <Buttons>Randomize</Buttons>
        <Buttons>Alphabetically</Buttons>
        <Buttons>Not Alphabetically</Buttons>
      </ButtonsBox>
    </Container>
  );
}
