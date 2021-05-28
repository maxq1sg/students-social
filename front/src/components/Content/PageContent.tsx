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
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import EditPage from "../pages/EditPage/EditPage";
import UsersSearchPage from "../pages/UserSearchPage/UserSearchPage";

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
        <Route exact path="/:id([0-9a-fA-F]{24})">
          <ProfilePage />
        </Route>
        <Route exact path="/:id([0-9a-fA-F]{24})/edit">
          <EditPage />
        </Route>
        <Route exact path="/courses">
          <CoursesPage />
        </Route>
        <Route exact path="/schedule">
          <SchedulePage />
        </Route>
        {/* <Route exact path="/">
          <MainPage />
        </Route> */}
        <Route exact path="/messages">
          <MessagePage />
        </Route>
        <Route exact path="/settings">
          <SettingsPage />
        </Route>
        <Route exact path="/create-course">
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
        <Route exact path="/search">
          <UsersSearchPage />
        </Route>
        <Route exact path="/users/:id">
          <ProfilePage />
        </Route>
      </PageContentWrapper>
    </ContentWrapper>
  );
};

export default PageContent;
