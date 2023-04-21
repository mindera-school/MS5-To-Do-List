import styled from "styled-components";

export const UserProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    position: absolute;
    top: 20px;
    right: 10px;
    border: none;
    color: red;
    background-color: transparent;
    cursor: pointer;
  }

  h3 {
    display: flex;
    flex-direction: column;
    color: white;
    margin-top: 20px;
  }

  h4 {
    color: white;
    margin-top: 8px;
    font-size: 18px;
  }
`;

export const StatsHolder = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-left: 40px;
  font-size: 16px;
  div {
    position: relative;
    text-align: center;
  }
`;

export const VerticalLine = styled.div`
  background-color: white;
  height: 100%;
  width: 2px;
`;

export const EditBtnContainer = styled.div`
  display: flex;
`;

export const EditBtn = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
