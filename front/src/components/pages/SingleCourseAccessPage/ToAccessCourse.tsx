import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ESingleCourseActionType } from "../../../redux/reducers/getSingleCourseReducer";
import { IUser } from "../../../redux/reducers/types";
import { RootState } from "../../../redux/store";
import LittleAva from "../../Course/LittleAva";
import {
  SingleCourseWrapper,
  CourseImage,
  CourseName,
} from "../../Course/SingleCourse";
import StyledButton from "../../StyledButton/StyledButton";
import Message from "../../../components/Message/Messgae";

const InfoContainer = styled.div`
  padding: 10px;
`;
const DescContainer = styled.div`
  margin: 15px 0;
`;
const ButtonWrapper = styled.div`
  margin: 10px 0;
`;
const FlexContainer = styled.div`
  display: flex;
`;
const ToAccessCourse = () => {
  const { error } = useSelector((state: RootState) => state.singleCourse);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({ type: ESingleCourseActionType.GET_SINGLE_COURSE_RESET });
    };
  }, [dispatch]);
  return (
    <>
      {error && (
        <SingleCourseWrapper>
          <CourseImage />
          <InfoContainer>
            <FlexContainer>
              {error.teachers.map((teacher: IUser) => {
                return (
                  <LittleAva
                    content={teacher.fullName}
                    id={teacher._id}
                    letter={teacher.fullName[0]}
                  />
                );
              })}
            </FlexContainer>
            <CourseName>{error.name}</CourseName>
            <DescContainer>{error.description}</DescContainer>
            <Message severity="error">
              {
                "Курс для Вас недоступен! Свяжитесь с преподавателями для доступа к курсу!"
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
