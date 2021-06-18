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
import { useComponentWillMount } from "../../../hooks/useComponentWillMount";
import { ITheme } from "../../DarkMode/themes";

const SearchResults = styled.div`
  margin-top: 20px;
  font-size: 1.5em;
  font-weight: bold;
  color: ${({ theme }: { theme: ITheme }) => theme.text};
  padding-bottom: 15px;
`;

const UserSearchContainer = styled.div`
  background: ${({ theme }: { theme: ITheme }) => theme.secondary};
  padding: 20px;
  border-radius: 15px;
  @media (max-width: 500px) {
    padding: 0;
  }
`;
const UsersSearchPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchTypeFilter, setSearchTypeFilter] = useState<string>("users");
  const { searchResults, loading, error, finish }: ISearchState = useSelector(
    (state: RootState) => state.searchResults
  );
  const dispatch = useDispatch();

  useComponentWillMount(() => {
    dispatch({
      type: ESearchActionType.SEARCH_RESET,
    });
  });
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
      <UserSearchContainer>
        <SearchInput
          {...{ keyword, setKeyword, searchTypeFilter, setSearchTypeFilter }}
        />
      </UserSearchContainer>
      {loading && <Loader />}
      {finish ? (
        searchResults.length !== 0 ? (
          <>
            <SearchResults>Результаты поиска</SearchResults>
            {searchResults.map((result: any) => {
              return result.friends ? (
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
