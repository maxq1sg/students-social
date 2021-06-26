import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  EGetGroupCoursesActionType,
  IGroupCoursesState,
} from "../../../../redux/reducers/getGroupCoursesReducer";
import { RootState } from "../../../../redux/store";
import { ITheme } from "../../../DarkMode/themes";
import Loader from "../../../Loader/Loader";
import Message from "../../../Message/Messgae";
import { CustomTable } from "./CustomComponents";
import { SubTitle } from "./SectionTitle";
import GroupMainInfoContainer from "./Wrapper";
const CustomLink = styled(Link)`
  color: ${({ theme }: { theme: ITheme }) => theme.colorReverse};
`;
const GroupCourses = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { courses, loading, error }: IGroupCoursesState = useSelector(
    (state: RootState) => state.groupCourses
  );
  useEffect(() => {
    dispatch({
      type: EGetGroupCoursesActionType.GET_GROUP_COURSES,
      payload: { id },
    });
  }, [dispatch, id]);

  return (
    <GroupMainInfoContainer>
      {loading && <Loader width="60px" />}
      {error && <Message severity="error">{error}</Message>}
      {!loading && courses.length ? (
        <>
          <SubTitle>Курсы группы</SubTitle>
          <CustomTable>
            {courses.map((course) => (
              <tr>
                <td>
                  <CustomLink className="link" to={`/courses/${course._id}`}>
                    {course.name}
                  </CustomLink>
                </td>
              </tr>
            ))}
          </CustomTable>
        </>
      ) : null}
    </GroupMainInfoContainer>
  );
};

export default GroupCourses;
