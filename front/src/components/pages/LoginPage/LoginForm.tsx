import styled from "styled-components";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { EUserLogin, IUserLoginState } from "../../../redux/reducers/types";
import { Redirect, useHistory } from "react-router";
import App from "../../../App";

const FormWrapper = styled.form`
  flex: 1 1 250px;
  padding: 15px;
  box-shadow: 0 0 10px 0 black;
  background: white;
`;
const FormInput = styled.input.attrs(
  (props: { onChange: (event: ChangeEvent<HTMLInputElement>) => void }) => ({
    type: "text",
  })
)`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid grey;
  margin-bottom: 15px;
`;
const FormSubmit = styled.button.attrs(({ disabled }) => ({
  type: "submit",
  disabled,
}))`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  border-radius: 5px;
  background: #1877f2;
  color: white;
  text-transform:uppercase;
  outline: none;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  border: none;
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.7 : 0.9)};
  }
`;
const LoginForm = () => {
  const history = useHistory();
  const [name, setName] = useState<string>("eco.vasyuk");
  const [password, setPassword] = useState<string>("123");
  const { user, loading } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: EUserLogin.USER_LOGIN, payload: { name, password } });
  };

  useEffect(() => {
    if (user) {
      history.push("/schedule");
    }
  }, [user]);
  return (
    <FormWrapper onSubmit={submitHandler}>
      <FormInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите логин"
      />
      <FormInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введите пароль"
      />
      <FormSubmit
        onClick={() => {
        }}
        disabled={loading}
      >
        {loading ? "Выполняется вход" : "войти"}
      </FormSubmit>
    </FormWrapper>
  );
};

export default LoginForm;
