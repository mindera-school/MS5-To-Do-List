import styled from "styled-components";

export const Container = styled.div`
  background-color: inherit;
  margin-left: 50px;
  display: flex;
`;

export const AddTagButton = styled.button`
  cursor: pointer;
  display: ${(props) => (props.display ? "block" : "none")};
  border: none;
  outline: none;
  background-color: inherit;
  font-size: 15px;
  font-weight: 300;
  line-height: 18px;
  text-align: left;
  color: white;
  transition: 0.5s;

  &:hover {
    scale: 1.05;
  }
`;

export const TagInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  background-color: inherit;
`;

export const CloseTag = styled.button`
  position: absolute;
  padding: 0;
  top: 0;
  right: 0;
  height: 15px;
  width: 15px;
  border: none;
  background-color: inherit;
  cursor: pointer;
  border-radius: 50px;
  display: none;
`;

export const TempTag = styled.div`
  position: relative;
  display: flex;
  height: 20px;
  width: 140px;
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
    display: block;
  }
`;
