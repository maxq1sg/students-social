import React, { SyntheticEvent } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import pant from "../../images/bsu.jpg";
import { ICourse } from "../../redux/reducers/types";
import { ITheme } from "../DarkMode/themes";
import StyledButton from "../StyledButton/StyledButton";
import LittleAva from "./LittleAva";
export const SingleCourseWrapper = styled.div`
  border-radius: 10px;
  background: ${({ theme }: { theme: ITheme }) => theme.secondary};
  padding: 10px;
  position: relative;
  min-height: 400px;
`;
export const CourseImage = styled.div`
  background: url(${pant}) center/cover no-repeat;
  height: 200px;
  border-radius: 10px;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.main}; ;
`;
export const AvaContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: rows;
  justify-content: end;
`;
export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;
export const CourseName = styled.div`
  color: ${({ theme }: { theme: ITheme }) => theme.text};
  font-weight: bold;
  font-size: 20px;
  margin: 8px 0;
`;

const SingleCourse = ({ course }: { course: ICourse }) => {
  const history = useHistory();
  const redirectClickHandler = (e: SyntheticEvent) => {
    history.push(`/courses/${course._id}`);
  };
  return (
    <SingleCourseWrapper>
      <CourseImage />
      <AvaContainer>
        {course.teachers.map((teacher) => (
          <LittleAva
            key={teacher._id}
            isPerson={true}
            letter={teacher.fullName[0]}
            content={teacher.fullName}
            id={teacher._id}
          />
        ))}
      </AvaContainer>
      <CourseName>{course.name}</CourseName>
      <div>{course.description}</div>
      <ButtonWrapper>
        <StyledButton onClick={redirectClickHandler} disabled={false}>
          перейти к курсу
        </StyledButton>
      </ButtonWrapper>
    </SingleCourseWrapper>
  );
};

export default SingleCourse;
