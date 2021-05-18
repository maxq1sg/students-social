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

const SearchResults = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #0d3670;
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
        resultType: "course",
        keyword,
      },
    });
  }, [keyword]);
  return (
    <>
      <SearchResults>Результаты поиска</SearchResults>
      {loading && <Loader width="98px" border="10px" />}
      {finish && searchResults.length == 0 ? (
        <Message severity="info">Нет результатов поиска</Message>
      ) : (
        <GridContainer>
          {searchResults.map((result: any) => (
            <SingleCourse course={result} />
          ))}
        </GridContainer>
      )}
    </>
  );
};

export default CourseSearchPage;
