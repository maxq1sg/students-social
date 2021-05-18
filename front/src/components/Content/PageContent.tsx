import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import CoursesPage from "../pages/CoursesPage/CoursesPage";
import MainPage from "../pages/MainPage/MainPage";
import MessagePage from "../pages/MessagesPage/MessagePage";
import SchedulePage from "../pages/SchedulePage/SchedulePage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import SearchBar from "../SearchBar/SearchBar";
import CourseCreatePage from "../pages/CourseCreatePage/CourseCreatePage";
import SingleCoursePage from "../pages/SingleCoursePage/SingleCoursePage";
import SingleCourseAccessPage from "../pages/SingleCourseAccessPage/SingleCourseAccessPage";
import CourseSearchPage from "../pages/CoursesSearchPage/CourseSearchPage";

const ContentWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 500px;
`;
const PageContentWrapper = styled.div`
  padding: 20px;
`;
const PageContent = () => {
  return (
    <ContentWrapper>
      <SearchBar />
      <PageContentWrapper>
        <Route exact path="/courses">
          <CoursesPage />
        </Route>
        <Route path="/schedule">
          <SchedulePage />
        </Route>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/messages">
          <MessagePage />
        </Route>
        <Route path="/settings">
          <SettingsPage />
        </Route>
        <Route path="/create-course">
          <CourseCreatePage />
        </Route>
        <Route exact path="/courses/:id">
          <SingleCoursePage />
        </Route>
        <Route exact path="/courses/access/:id">
          <SingleCourseAccessPage />
        </Route>
        <Route exact path="/search/courses/:keyword">
          <CourseSearchPage />
        </Route>
      </PageContentWrapper>
    </ContentWrapper>
  );
};

export default PageContent;
