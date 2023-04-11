import styled, { keyframes } from "styled-components";

export const slideIn = keyframes`
  0% {
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    
    transform: translateY(0);
    opacity: 1;
  }
`;

export const AddModal = styled.div`
  position: absolute;
  top: 30px;
  margin-top: 20px;
  min-width: 780px;
  height: 600px;
  background-color: ${({ theme }) => (theme.taskColor)};
  z-index: 1;
  border-radius: 50px;
  display: ${(props) => props.display};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  box-sizing: border-box;
  z-index: 4;
  animation: ${slideIn} 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CloseButton = styled.button`
  cursor: pointer;
  background: inherit;
  border: none;
  padding: 0;
  transition: 0.4s;


  &:hover {
    scale: 1.2;
  }
`;

export const TitleInput = styled.input`
  height: 50px;
  border-radius: 50px;
  padding: 15px;
  background-color:  ${({ theme }) => (theme.editInputBg)};
  display: flex;
  text-align: center;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 25px;
  color: ${({ theme }) => (theme.menuFontColor)};
  border: none;
  outline: none;

  ::placeholder {
    color: white;
  }
`;

export const ContainerInput = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 1px solid white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const DateTagdiv = styled.div`
  color: ${({ theme }) => (theme.fontColor)};
  font-size: 20px;
  font-weight: 300;
  line-height: 23px;
  display: flex;
  align-items: center;
`;

export const DateInput = styled.input`
  position: relative;
  margin-left: 10px;
  border-radius: 50px;
  height: 38px;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  width: 26%;

  padding: 7px;
  background-color: ${({ theme }) => (theme.inputColor)};
  display: flex;
  text-indent: 4px;
  box-sizing: border-box;
  color: ${({ theme }) => (theme.fontColor)};
  border: none;
  outline: none;

  ::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 5%;
    top: 20%;
    cursor: pointer;
    filter: invert(100%);
}
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Description = styled.p`
  font-size: 25px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme }) => (theme.fontColor)};
`;

export const DescriptionInput = styled.textarea`
  border-radius: 20px;
  background-color: ${({ theme }) => (theme.editInputBg)};
  display: flex;
  flex-wrap: wrap;
  line-height: 1.1;
  box-sizing: border-box;
  padding: 15px;
  color: ${({ theme }) => (theme.menuFontColor)};
  border: none;
  outline: none;
  width: 100%;
  height: 130px;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;

  ::placeholder {
    color: ${({ theme }) => (theme.menuFontColor)};
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const AddButtonsDiv = styled.div`
  border-bottom: 1px solid white;
  padding: 8px 20px;
  margin-bottom: 5px;
`;

export const AddDiffButton = styled.button`
  background-color: inherit;
  padding: 5px;
  border-radius: 20px;
  outline: none;
  border: 1px solid white;
  margin: 0 5px;
  color:  ${({ theme }) => (theme.fontColor)};
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    scale: 1.2;
  }
`;

export const AddButton = styled.button`
  color: ${({ theme }) => (theme.fontColor)};
  border-radius: 20px;
  outline: none;
  border: none;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  text-align: left;
  margin-top: 5px;
  cursor: pointer;
  transition: 0.4s;


  &:hover {
    scale: 1.1;
  }
`;
