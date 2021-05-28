import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  ESearchActionType,
  ISearchState,
} from "../../../redux/reducers/searchReducer";
import { ICourse, IUser } from "../../../redux/reducers/types";
import { RootState } from "../../../redux/store";
import SingleCourse from "../../Course/SingleCourse";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Messgae";
import { GridContainer } from "../CoursesPage/CoursesPage";
import { Helmet } from "react-helmet";
import UserSearchResult from "./UserSearchResult";
import SearchInput from "./SearchInput";
import FilterSelect from "./FilterSelect/FilterSelect";
import GroupsSearchResult from "./GroupsSearchResult";

const SearchResults = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #0d3670;
  padding-bottom: 15px;
`;
const UsersSearchPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchTypeFilter, setSearchTypeFilter] = useState<string>("users");
  const { searchResults, loading, error, finish }: ISearchState = useSelector(
    (state: RootState) => state.searchResults
  );
  const dispatch = useDispatch();
  console.log(searchTypeFilter);
  useEffect(() => {
    return () => {
      setKeyword("");
      dispatch({
        type: ESearchActionType.SEARCH_RESET,
      });
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>Поиск</title>
      </Helmet>
      <div>
        <SearchInput {...{ keyword, setKeyword, searchTypeFilter }} />
        <FilterSelect {...{ searchTypeFilter, setSearchTypeFilter }} />
      </div>
      {loading && <Loader />}
      {finish ? (
        searchResults.length !== 0 ? (
          <>
            <SearchResults>Результаты поиска</SearchResults>
            {searchResults.map((result: any) => {
              return searchTypeFilter === "users" ? (
                <UserSearchResult user={result} />
              ) : (
                <GroupsSearchResult group={result} />
              );
            })}
          </>
        ) : (
          <>
            <SearchResults>Результаты поиска</SearchResults>

            <Message severity="info">Нет результатов</Message>
          </>
        )
      ) : null}
    </>
  );
};

export default UsersSearchPage;
