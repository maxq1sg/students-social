import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router";
import PageContent from "./components/Content/PageContent";
import FlexContainer from "./components/FlexContainer/FlexContainer";
import NavBar from "./components/NavBar/NavBar";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import { EUserLogin } from "./redux/reducers/types";
import { RootState } from "./redux/store";

function App() {
  const user = useSelector<RootState>((state) => state.login.user);
  useEffect(() => {
    if (!user) {
      history.push("/login");
      localStorage.removeItem("schedule");
    }
  }, [user]);
  const history = useHistory();
  return (
    <>
      <Route exact path="/login" render={() => <LoginPage />} />
      {user && (
        <FlexContainer>
          <NavBarContainer />
          <PageContent />
        </FlexContainer>
      )}
    </>
  );
}

export default App;
