import React, { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router";
import SearchIcon from "@material-ui/icons/Search";
import { ESearchActionType } from "../../../redux/reducers/searchReducer";
import { useDispatch } from "react-redux";

const SearchInput = ({
  keyword,
  setKeyword,
  searchTypeFilter,
}: {
  keyword: string;
  setKeyword: (arg: string) => void;
  searchTypeFilter: string;
}) => {
  const dispatch = useDispatch();
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      dispatch({
        type: ESearchActionType.SEARCH_RESET,
      });
      dispatch({
        type: ESearchActionType.SEARCH,
        payload: {
          resultType: searchTypeFilter,
          keyword,
        },
      });
    }
  };
  return (
    <form onSubmit={submitHandler} className="input-wrapper">
      <SearchIcon className="search-icon" />
      <input
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
        placeholder="Поиск пользователя"
      />
    </form>
  );
};

export default SearchInput;
