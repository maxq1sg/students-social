import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { ESingleCourseActionType } from "../../../redux/reducers/getSingleCourseReducer";
import { IUser } from "../../../redux/reducers/types";
import { RootState } from "../../../redux/store";
import { ISingleCourseState } from "../../../redux/reducers/getSingleCourseReducer";
import Loader from "../../Loader/Loader";

const SingleCoursePage = () => {
  const history = useHistory();
  const { loading, done, course, error } = useSelector(
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
  }, []);
  useEffect(() => {
    if (done && error) {
      history.push(`/courses/access/${courseId}`);
    }
  }, [done]);
  return <div>
      {loading&&<Loader border={"10px"} width={"90px"}/>}
      {done && course && <div>добро пожаловать</div>}</div>;
};

export default SingleCoursePage;
