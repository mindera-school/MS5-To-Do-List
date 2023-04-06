import styled from "styled-components";
import { CloseTag } from "../TagsList/style.js";

export const StyledTag = styled.button`
  position: relative;
  display: flex;
  height: 20px;
  min-width: 75px;
  align-items: center;
  font-size: 14px;
  padding: 0 20px;
  box-sizing: border-box;
  margin-right: 5px;
  border-radius: 20px;
  color: white;
  background-color: ${(props) => props.tagColor};
  outline: none;
  border: none;
  &:hover ${CloseTag} {
    display: ${(props) => props.display === true ? "block" : "none"};
  }
`;
