import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import CoursesPage from "../pages/CoursesPage/CoursesPage";
import MessagePage from "../pages/MessagesPage/MessagePage";
import SchedulePage from "../pages/SchedulePage/SchedulePage";
import SearchBar from "../SearchBar/SearchBar";
import CourseCreatePage from "../pages/CourseCreatePage/CourseCreatePage";
import SingleCoursePage from "../pages/SingleCoursePage/SingleCoursePage";
import SingleCourseAccessPage from "../pages/SingleCourseAccessPage/SingleCourseAccessPage";
import CourseSearchPage from "../pages/CoursesSearchPage/CourseSearchPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import EditPage from "../pages/EditPage/EditPage";
import UsersSearchPage from "../pages/UserSearchPage/UserSearchPage";
import GroupInfoPage from "../pages/GroupInfoPage/GroupInfoPage";
import MainContainer from "../MainContainer";
import FriendsPage from "../pages/FriendsPage/FriendsPage";
import DefaultPage from "../pages/DefaultPage/DefaultPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const ContentWrapper = styled.div`
  flex: 1 0;
  margin: 0 8px;
`;
const PageContentWrapper = styled.div`
  padding: 20px;
  @media (max-width: 478px) {
    padding: 0px;
  }
`;
const PageContent = () => {
  return (
    <ContentWrapper>
      <SearchBar />
      <MainContainer>
        <PageContentWrapper>
          <Switch>
            <Route exact path="/:id([0-9a-fA-F]{24})">
              <ProfilePage />
            </Route>
            <Route exact path="/:id([0-9a-fA-F]{24})/edit">
              <EditPage />
            </Route>
            <ProtectedRoute exact path="/:id/courses" component={CoursesPage} />
            <Route exact path="/:id/friends">
              <FriendsPage />
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
            {/* <Route exact path="/settings">
              <SettingsPage />
            </Route> */}
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
            {/* <Route exact path="/users/:id">
          <ProfilePage />
        </Route> */}
            <Route exact path="/groups/:id">
              <GroupInfoPage />
            </Route>
            <Route path="/">
              <DefaultPage />
            </Route>
          </Switch>
        </PageContentWrapper>
      </MainContainer>
    </ContentWrapper>
  );
};

export default PageContent;
