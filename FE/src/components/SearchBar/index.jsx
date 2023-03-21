import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import {
  InputSearchBar,
  SearchBarContainer,
  SearchInput,
  SearchButton,
} from "./style";

export default function SearchBar({ setInputValue, inputValue }) {
  const click = () => setInputValue("");
  return (
    <SearchBarContainer>
      <InputSearchBar>
        <SearchInput
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SearchButton onClick={click}>
          <TiDeleteOutline size={26} />
        </SearchButton>
      </InputSearchBar>
    </SearchBarContainer>
  );
}
