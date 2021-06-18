import React, { useEffect } from "react";
import MyTextInput from "./MyTextInput";
import { Formik, Form } from "formik";
import { passwordValidation, userDataValidation } from "./validationSchema";
import { IUser } from "../../../redux/reducers/types";
import styled from "styled-components";
import StyledButton from "../../StyledButton/StyledButton";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EEditPasswordActionType } from "../../../redux/reducers/editPasswordReducer";

import Message from "../../Message/Messgae";

const InputWrapper = styled.div`
  margin: 10px 0;
`;
const PasswordForms = ({ data }: { data: IUser }) => {
  const history = useHistory();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.editPassword
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      history.push(`/${data.id}`);
    }
  }, [success]);
  useEffect(() => {
    return () => {
      dispatch({ type: EEditPasswordActionType.EDIT_PASSWORD_RESET });
    };
  }, []);
  return (
    <>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          newPasswordConfirm: "",
        }}
        validationSchema={passwordValidation}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          dispatch({
            type: EEditPasswordActionType.EDIT_PASSWORD,
            payload: { id: data.id, token: data.token, ...values },
          });
        }}
      >
        <Form>
          <InputWrapper>
            <MyTextInput
              label=""
              name="oldPassword"
              type="password"
              placeholder="Старый пароль"
            />
          </InputWrapper>
          <InputWrapper>
            <MyTextInput
              label=""
              name="newPassword"
              type="password"
              placeholder="Новый пароль"
            />
          </InputWrapper>
          <InputWrapper>
            <MyTextInput
              label=""
              name="newPasswordConfirm"
              type="password"
              placeholder="Подтвердите новый пароль"
            />
          </InputWrapper>
          <StyledButton disabled={loading}>
            {loading ? "загрузка..." : "отправить"}
          </StyledButton>
          {error && <Message severity="error">{error}</Message>}
        </Form>
      </Formik>
    </>
  );
};

export default PasswordForms;
