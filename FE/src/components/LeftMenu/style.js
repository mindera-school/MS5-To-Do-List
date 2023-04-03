import styled from "styled-components";

export const Container = styled.div`
  height: 87vh;
  width: 238px;
  border-radius: 30px;
  background: #17425e;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  height: 200px;
  width: 200px;
  background-color: inherit;
  overflow: auto;
  //remove border
  border: 1px solid red;
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
  box-sizing: border-box;
`;

export const Buttons = styled.button`
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: center;
  height: 39px;
  width: 100%;
  margin-bottom: 10px;
  border: 0;
  border-radius: 10px;
  background: #1a4d6f;
  color: white;
  box-shadow: 0px 4px 4px 0px #00000040;
`;
