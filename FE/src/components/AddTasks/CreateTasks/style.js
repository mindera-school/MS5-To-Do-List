import styled from "styled-components";

export const CreateTasksButton = styled.button`
  padding: 13px;
  height: 38px;
  width: 158px;
  font-weight: 400;
  font-size: 20px;
  color: ${({ theme }) => (theme.fontColor)};
  background-color: ${({ theme }) => (theme.inputColor)};
  cursor: pointer;
  border-radius: 50px;
  border: 2px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
