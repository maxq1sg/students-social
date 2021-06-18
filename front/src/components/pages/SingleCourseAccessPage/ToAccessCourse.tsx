import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import pant from "../../../images/marco-pantani.jpg";
import { ESingleCourseActionType } from "../../../redux/reducers/getSingleCourseReducer";
import { IUser } from "../../../redux/reducers/types";
import { RootState } from "../../../redux/store";
import LittleAva from "../../Course/LittleAva";
import {
  AvaContainer,
  SingleCourseWrapper,
  CourseImage,
  CourseName,
} from "../../Course/SingleCourse";
import StyledButton from "../../StyledButton/StyledButton";
import Message from "../../../components/Message/Messgae";
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
const InfoContainer = styled.div`
  padding: 10px;
`;
const DescContainer = styled.div`
  margin: 15px 0;
`;
const ButtonWrapper = styled.div`
  margin: 10px 0;
`;

const ToAccessCourse = () => {
  const { error } = useSelector((state: RootState) => state.singleCourse);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({ type: ESingleCourseActionType.GET_SINGLE_COURSE_RESET });
    };
  }, []);
  return (
    <>
      {error && (
        <SingleCourseWrapper>
          <CourseImage />
          <InfoContainer>
            {error.teachers.map((teacher: IUser) => {
              return (
                <LittleAva
                  content={teacher.fullName}
                  id={teacher._id}
                  letter={teacher.fullName[0]}
                />
              );
            })}
            <CourseName>{error.name}</CourseName>
            <DescContainer>{error.description}</DescContainer>
            <Message severity="error">
              {
                "Куря для Вас недоступен! Свяжитесь с преподавателями для доступа к курсу!"
              }
            </Message>
            <ButtonWrapper>
              <StyledButton disabled={false}>перейти к курсу</StyledButton>
            </ButtonWrapper>
          </InfoContainer>
        </SingleCourseWrapper>
      )}
    </>
  );
};

export default ToAccessCourse;
