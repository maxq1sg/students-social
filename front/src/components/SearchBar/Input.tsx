import React, { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

import "./SearchBar.css";
import { ITheme } from "../DarkMode/themes";

export const StyledInput = styled.input`
  border: none;
  width: 100%;
  &:focus {
    outline: none;
  }
  border-radius: 5px;
  padding: 10px 40px 5px;
  font-size: 16px;
  background: ${({ theme }: { theme: ITheme }) => theme.secondary};
  &::placeholder {
    color: ${({ theme }: { theme: ITheme }) => theme.colorReverse};
  }
  color: ${({ theme }: { theme: ITheme }) => theme.colorReverse};
`;

const Input = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const history = useHistory();
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (searchWord.trim()) {
      history.push(`/search/courses/${searchWord}`);
    }
  };
  return (
    <form onSubmit={submitHandler} className="input-wrapper">
      <SearchIcon className="search-icon" />
      <StyledInput
        value={searchWord}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchWord(e.target.value)
        }
        placeholder="Поиск курса..."
      />
    </form>
  );
};

export default Input;
