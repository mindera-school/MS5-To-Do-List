import styled from "styled-components";

export const Container = styled.div`
  height: 85vh;
  width: 238px;
  border-radius: 30px;
  background: ${({ theme }) => (theme.secondaryColor)};
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 0;

  @media (max-width: 1180px) {
      overflow-y: scroll;
      width: 60vw;
      height: fit-content;
  }
`;

export const Tags = styled.button`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  border-radius: 10px;
  padding: 0 20px;
  height: 35px;
  width: 200px;
  color: white;
  box-sizing: border-box;
  background-color: ${(props) => props.tagColor};
  margin-bottom: 5px;
  outline: none;
  border: none;
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    scale: 1.05;
  }
`;

export const Titles = styled.p`
  margin: 11px;
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
  color: white;
  border-bottom: 1px solid white;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
`;

export const TagsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
  width: 100%;
  background-color: inherit;
  overflow: auto;

   @media (max-width: 1180px) {
    min-height: 50px;
  }
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
  box-sizing: border-box;

  @media (max-width: 1180px) {
      overflow-y: scroll;
      width: 80%
  }
`;

export const Buttons = styled.button`
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: center;
  height: 39px;
  width: 100%;
  margin-bottom: 15px;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => (theme.buttonBg)};
  color: white;
  box-shadow: 0px 4px 4px 0px #00000040;
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    scale: 1.05;
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`;
