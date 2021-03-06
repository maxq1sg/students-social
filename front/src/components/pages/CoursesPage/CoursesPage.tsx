import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EGetCoursesActionType } from "../../../redux/reducers/getCoursesRedcuer";
import { RootState } from "../../../redux/store";
import SingleCourse from "../../Course/SingleCourse";
import { ICourse } from "../../../redux/reducers/types";
import Loader from "../../Loader/Loader";
import styled from "styled-components";
import Message from "../../Message/Messgae";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: 1fr;
  grid-gap: 10px;
  padding: 10px;
`;
const CoursesPage = () => {
  const {
    courses,
    loading,
    done,
  }: { courses: ICourse[]; loading: boolean; done: boolean } = useSelector(
    (state: RootState) => state.courses
  );
  const { id: pathId } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: EGetCoursesActionType.GET_COURSES,
      payload: {
        userId: pathId,
      },
    });

    return () => {
      dispatch({ type: EGetCoursesActionType.COURSES_RESET });
    };
  }, [dispatch, pathId]);
  return (
    <div>
      <Helmet>
        <title>Мои курсы</title>
      </Helmet>
      {loading && <Loader border="8px" width={"96px"} />}
      {done ? (
        courses.length ? (
          <GridContainer>
            {courses.map((course: ICourse) => (
              <SingleCourse key={course._id} course={course} />
            ))}
          </GridContainer>
        ) : (
          <Message severity="info">
            Вы еще не участвуете ни в одном курсе!
          </Message>
        )
      ) : null}
    </div>
  );
};

export default CoursesPage;
