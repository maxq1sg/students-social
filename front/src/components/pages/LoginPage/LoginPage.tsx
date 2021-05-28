import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IUser } from "../../../redux/reducers/types";
import { RootState } from "../../../redux/store";
import Message from "../../Message/Messgae";
import Intro from "./Intro";
import LoginForm from "./LoginForm";
import {Helmet} from "react-helmet";

const LoginPageContainer = styled.div`
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;
const LoginPageWrapper = styled.div`
  padding: 30px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CustomMessage = styled(Message)`
  width: 100%;
  max-width: 1080px;
`;
const LoginPage = () => {
  const { error } = useSelector((state: RootState) => state.login);
  return (
    <>
      <Helmet>
        <title>Вход в систему</title>
      </Helmet>
      
      <LoginPageWrapper>
        <LoginPageContainer>
          <Intro />
          <LoginForm />
          {error && (
            <Message className="message-login" severity="error">
              {error}
            </Message>
          )}
        </LoginPageContainer>
      </LoginPageWrapper>
    </>
  );
};

export default LoginPage;
