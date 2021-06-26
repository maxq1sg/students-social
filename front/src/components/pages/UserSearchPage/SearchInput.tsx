import React, { SyntheticEvent } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { ESearchActionType } from "../../../redux/reducers/searchReducer";
import { useDispatch } from "react-redux";
import { StyledInput } from "../../SearchBar/Input";
import FilterSelect from "./FilterSelect/FilterSelect";
const SearchInput = ({
  keyword,
  setKeyword,
  searchTypeFilter,
  setSearchTypeFilter,
}: {
  keyword: string;
  setKeyword: (arg: string) => void;
  searchTypeFilter: string;
  setSearchTypeFilter: (arg: string) => void;
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
    <form onSubmit={submitHandler}>
      <div className="input-wrapper">
        <SearchIcon className="search-icon" />
        <StyledInput
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
          placeholder={
            searchTypeFilter === "users"
              ? "Поиск пользователя..."
              : "Поиск группы..."
          }
        />
      </div>
      <FilterSelect {...{ searchTypeFilter, setSearchTypeFilter }} />
    </form>
  );
};

export default SearchInput;
