import React, { SyntheticEvent } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import pant from "../../images/marco-pantani.jpg";
import { ICourse } from "../../redux/reducers/types";
import StyledButton from "../StyledButton/StyledButton";
import PrepodAva from "./PrepodAva";
const SingleCourseWrapper = styled.div`
  height: 300px;
  border-radius: 10px;
  background: white;
  padding: 10px;
`;
const CourseImage = styled.div`
  background: url(${pant}) center/cover no-repeat;
  height: 100px;
  border-radius: 10px;
`;
const AvaContainer = styled.div`
  display: flex;
  flex-direction: rows;
  justify-content: end;
`;
const CourseName = styled.div`
  color: #0d3670;
  font-weight: bold;
  font-size: 20px;
  margin: 8px 0;
`;

const SingleCourse = ({ course }: { course: ICourse }) => {
  console.log(course);
  const history = useHistory()
  const redirectClickHandler=(e:SyntheticEvent)=>{
    history.push(`/courses/${course._id}`)
  }
  return (
    <SingleCourseWrapper>
      <CourseImage />
      <AvaContainer>
        {course.teachers.map((teacher) => (
          <PrepodAva name={teacher.fullName} />
        ))}
      </AvaContainer>
      <CourseName>{course.name}</CourseName>
      <div>{course.description}</div>
      <StyledButton onClick={redirectClickHandler} disabled={false}>перейти к курсу</StyledButton>
    </SingleCourseWrapper>
  );
};

export default SingleCourse;
