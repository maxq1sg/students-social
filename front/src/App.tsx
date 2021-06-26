import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router";
import styled, { ThemeProvider } from "styled-components";
import PageContent from "./components/Content/PageContent";
import { GlobalStyles } from "./components/DarkMode/globalStyle";
import { darkTheme, lightTheme } from "./components/DarkMode/themes";
import Loader from "./components/Loader/Loader";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import { RootState } from "./redux/store";

const AppFlexContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;
const LoginPage = React.lazy(
  () => import("./components/pages/LoginPage/LoginPage")
);

function App() {
  const user = useSelector<RootState>((state) => state.login.user);
  const { dark } = useSelector((state: RootState) => state.theme);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
      localStorage.removeItem("schedule");
    }
  }, [user,history]);

  return (
    <>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Route
          exact
          path="/login"
          render={() => (
            <Suspense fallback={<Loader />}>
              <LoginPage />
            </Suspense>
          )}
        />
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
