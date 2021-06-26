import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  ESearchActionType,
  ISearchState,
} from "../../../redux/reducers/searchReducer";
import { RootState } from "../../../redux/store";
import SingleCourse from "../../Course/SingleCourse";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Messgae";
import { GridContainer } from "../CoursesPage/CoursesPage";
import { Helmet } from "react-helmet";
import { useComponentWillMount } from "../../../hooks/useComponentWillMount";
import { ITheme } from "../../DarkMode/themes";

const SearchResults = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: ${({ theme }: { theme: ITheme }) => theme.text};
  padding-bottom: 15px;
`;
const CourseSearchPage = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams<{ keyword: string }>();

  const { searchResults, loading, error, finish }: ISearchState = useSelector(
    (state: RootState) => state.searchResults
  );

  useEffect(() => {
    dispatch({
      type: ESearchActionType.SEARCH,
      payload: {
        resultType: "courses",
        keyword,
      },
    });
  }, [keyword, dispatch]);
  useComponentWillMount(() => {
    dispatch({
      type: ESearchActionType.SEARCH_RESET,
    });
  });
  return (
    <>
      <Helmet>
        <title>Результаты поиска: {keyword}</title>
      </Helmet>
      {loading && <Loader />}
      {error && <Message severity={"error"}>{error}</Message>}
      {finish ? (
        searchResults.length !== 0 ? (
          <>
            <SearchResults>Результаты поиска</SearchResults>
            <GridContainer>
              {searchResults.map((result: any) => (
                <SingleCourse course={result} />
              ))}
            </GridContainer>
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

export default CourseSearchPage;
