import styled from "styled-components";

export const StyledPopconfirm = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 7px;
  border-radius: 5px;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  display: ${({ display }) => display};
  background-color: ${({ theme }) => theme.taskColor};
  color: ${({ theme }) => theme.fontColor};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px 0px;
  z-index: 3;
`;

export const StyledButton = styled.button`
  position: static !IMPORTANT;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;

  &:hover {
    scale: 1.1;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 16px;
`;