import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router";
import styled, { ThemeProvider } from "styled-components";
import PageContent from "./components/Content/PageContent";
import { GlobalStyles } from "./components/DarkMode/globalStyle";
import { darkTheme, ITheme, lightTheme } from "./components/DarkMode/themes";
import FlexContainer from "./components/FlexContainer/FlexContainer";
import NavBar from "./components/NavBar/NavBar";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import { EUserLogin } from "./redux/reducers/types";
import { RootState } from "./redux/store";
const AppFlexContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;
function App() {
  const user = useSelector<RootState>((state) => state.login.user);
  const { dark } = useSelector((state: RootState) => state.theme);
  useEffect(() => {
    if (!user) {
      history.push("/login");
      localStorage.removeItem("schedule");
    }
  }, [user]);

  const history = useHistory();
  return (
    <>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Route exact path="/login" render={() => <LoginPage />} />
        {user && (
          <AppFlexContainer>
            <NavBarContainer />
            <PageContent />
          </AppFlexContainer>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
