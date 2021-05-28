import React from "react";
import styled from "styled-components";
import pant from "../../../images/marco-pantani.jpg";
import { IUser } from "../../../redux/reducers/types";
import {AvaContainer,SingleCourseWrapper,CourseImage,CourseName} from "../../Course/SingleCourse"
import StyledButton from "../../StyledButton/StyledButton"
// const CourseWrapper = styled.div`
//   min-height: 500px;
//   border-radius: 20px;
//   box-shadow: 0 0 3px 0 black;
//   background: #fff;
//   padding: 15px;
// `;
// const CourseImage = styled.div`
//   background: url(${pant}) center/cover no-repeat;
//   height: 200px;
//   border-radius: 10px;
// `;
// const CourseTitle = styled.div`
//   color: #0d3670;
//   font-weight: bold;
//   font-size: 30px;
//   margin: 8px 0;
// `;
const ToAccessCourse = () => {
  return (
    <>
      <SingleCourseWrapper>
        <CourseImage />
        <AvaContainer>
        </AvaContainer>
        <CourseName>course.name</CourseName>
        <div>course.description</div>
        <StyledButton disabled={false}>
          перейти к курсу
        </StyledButton>
      </SingleCourseWrapper>
    </>
  );
};

export default ToAccessCourse;
