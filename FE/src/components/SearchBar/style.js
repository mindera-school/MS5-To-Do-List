import styled from "styled-components";

export const InputSearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  background-color: #8d99ae;
  border-radius: 50px;
  border: 0;
  height: 40px;
  outline: none;
  box-sizing: border-box;
  padding-left: 10px;
  font-weight: 400;
  font-size: 20px;
  color: white;
  padding-right: 45px;

  ::placeholder {
    color: white;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 0;
  background-color: inherit;
  border: none;
  height: 100%;
  padding: 7px 15px;
  border-radius: 50px;
  font-size: 20px;
  color: white;
  cursor: pointer;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
`;
