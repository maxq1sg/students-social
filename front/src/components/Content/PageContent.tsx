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
            <ProtectedRoute
              exact
              path="/:id([0-9a-fA-F]{24})"
              component={ProfilePage}
            />
            <ProtectedRoute
              exact
              path="/:id([0-9a-fA-F]{24})/edit"
              component={EditPage}
            />

            <ProtectedRoute exact path="/:id/courses" component={CoursesPage} />
            <ProtectedRoute exact path="/:id/friends" component={FriendsPage} />
            <ProtectedRoute exact path="/schedule" component={SchedulePage} />
            <ProtectedRoute exact path="/messages" component={MessagePage} />

            <ProtectedRoute
              exact
              path="/create-course"
              component={CourseCreatePage}
            />

            <ProtectedRoute
              exact
              path="/courses/:id"
              component={SingleCoursePage}
            />

            <ProtectedRoute
              exact
              path="/courses/access/:id"
              component={SingleCourseAccessPage}
            />
            <ProtectedRoute
              exact
              path="/search/courses/:keyword"
              component={CourseSearchPage}
            />
            <ProtectedRoute exact path="/search" component={UsersSearchPage} />
            <ProtectedRoute
              exact
              path="/groups/:id"
              component={GroupInfoPage}
            />
            <ProtectedRoute path="/" component={DefaultPage} />
          </Switch>
        </PageContentWrapper>
      </MainContainer>
    </ContentWrapper>
  );
};

export default PageContent;
