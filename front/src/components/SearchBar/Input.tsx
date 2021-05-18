import React, { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { RouteComponentProps, useHistory } from "react-router-dom";

import "./SearchBar.css";

const StyledInput = styled.input`
  border: none;
  width: 100%;
  &:focus {
    outline: none;
  }
  border-radius: 5px;
  padding: 10px 40px 5px;
  font-size: 16px;
  &::placeholder {
    color: #8695a0;
  }
`;

interface IHistoryProps {
  history: History;
}

const Input = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const history = useHistory()
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
