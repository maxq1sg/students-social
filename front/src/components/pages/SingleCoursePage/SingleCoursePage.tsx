import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { ESingleCourseActionType } from "../../../redux/reducers/getSingleCourseReducer";
import { IUser } from "../../../redux/reducers/types";
import { RootState } from "../../../redux/store";
import { ISingleCourseState } from "../../../redux/reducers/getSingleCourseReducer";
import Loader from "../../Loader/Loader";
import { Helmet } from "react-helmet";
import TaskList from "./TaskList";
import TimeExpire from "./TimeExpire";

const SingleCoursePage = () => {
  const history = useHistory();
  const { loading, success, course, error } = useSelector(
    (state: RootState): ISingleCourseState => state.singleCourse
  );
  const { id: courseId } = useParams<{ id: string }>();
  const { user }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: ESingleCourseActionType.GET_SINGLE_COURSE,
      payload: { user: user?.id, course: courseId },
    });
  }, [courseId, user?.id, dispatch]);
  const location = useLocation();
  useEffect(() => {
    if (error) {
      history.push(`/courses/access/${courseId}`, { from: location.pathname });
    }
  }, [error, courseId, location.pathname, history]);

  return (
    <>
      <Helmet>
        <title>Курс</title>
      </Helmet>
      {loading && <Loader />}
      {success && course && (
        <>
          <TaskList course={course} />
          <TimeExpire course={course} />
        </>
      )}
    </>
  );
};

export default SingleCoursePage;
