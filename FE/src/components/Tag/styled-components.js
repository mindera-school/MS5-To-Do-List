import styled from "styled-components";

export const StyledTag = styled.button`
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
  background-color: ${props => props.tagColor};
  outline: none;
  border: none;
`;




