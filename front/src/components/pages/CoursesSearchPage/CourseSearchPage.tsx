import React, { useEffect } from "react";
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

const SearchResults = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #0d3670;
  padding-bottom:15px;
`;
const CourseSearchPage = () => {
  const { keyword } = useParams<{ keyword: string }>();

  const { searchResults, loading, error, finish }: ISearchState = useSelector(
    (state: RootState) => state.searchResults
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: ESearchActionType.SEARCH,
      payload: {
        resultType: "courses",
        keyword,
      },
    });
  }, [keyword]);
  return (
    <>
      <Helmet>
        <title>Результаты поиска: {keyword}</title>
      </Helmet>
      {loading && <Loader />}
      {finish ? searchResults.length !== 0?(
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
      ):null }
    </>
  );
};

export default CourseSearchPage;
