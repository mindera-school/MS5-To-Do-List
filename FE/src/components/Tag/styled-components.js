import styled from "styled-components";

export const StyledTag = styled.div`
  display: flex;
  height: 20px;
  width: fit-content;
  align-items: center;
  font-size: 14px;
  padding: 0px 20px 0px 20px;
  box-sizing: border-box;
  margin-right: 5px; 
  border-radius: 20px; 
  color: white;
  background-color: ${props => props.tagColor};
`;



