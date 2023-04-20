import styled from "styled-components";

export const FormContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.fontColor};
`;

export const EditLabel = styled.label`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: ${({ theme }) => theme.fontColor};
`;

export const LabelName = styled.div`
  color: ${({ theme }) => theme.fontColor};
`;

export const EditInput = styled.input`
  margin-top: 10px;
  height: 40px;
  border-radius: 20px;
  border: none;
  padding-left: 10px;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.inputColor};
`;

export const CancelBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 10px;
  border: none;
  color: red;
  background-color: transparent;
  cursor: pointer;
`;

export const SaveBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
