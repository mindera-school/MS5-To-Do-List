import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useAppContext } from "../../context.js";
import {
  InputSearchBar,
  SearchBarContainer, SearchButton, SearchInput
} from "./style";

export default function SearchBar({ setInputValue, inputValue }) {
  const click = () => setInputValue("");
  const theme = useAppContext().themeMode;
  return (
    <SearchBarContainer theme={theme}>
      <InputSearchBar theme={theme}>
        <SearchInput
          theme={theme}
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SearchButton onClick={click} theme={theme}>
          <TiDeleteOutline size={26} />
        </SearchButton>
      </InputSearchBar>
    </SearchBarContainer>
  );
}
