import React, { useEffect } from "react";
import MyTextInput from "./MyTextInput";
import { Formik, Form } from "formik";
import { passwordValidation } from "./validationSchema";
import { IUser } from "../../../redux/reducers/types";
import styled from "styled-components";
import StyledButton from "../../StyledButton/StyledButton";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EEditPasswordActionType } from "../../../redux/reducers/editPasswordReducer";

import Message from "../../Message/Messgae";
import { EModalActions } from "../../../redux/reducers/modalReducer";

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
      setTimeout(() => {
        dispatch({
          type: EModalActions.OPEN_MODAL,
          payload: "Изменения внесены!",
        });
      }, 300);
    }
  }, [success, history, dispatch, data.id]);
  useEffect(() => {
    return () => {
      dispatch({ type: EEditPasswordActionType.EDIT_PASSWORD_RESET });
    };
  }, [dispatch]);
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
          dispatch({
            type: EEditPasswordActionType.EDIT_PASSWORD,
            payload: { id: data.id, token: data.token, ...values },
          });
        }}
      >
        <Form>
          <InputWrapper>
            <MyTextInput
              autoComplete="on"
              label=""
              name="oldPassword"
              type="password"
              placeholder="Старый пароль"
            />
          </InputWrapper>
          <InputWrapper>
            <MyTextInput
              autoComplete="on"
              label=""
              name="newPassword"
              type="password"
              placeholder="Новый пароль"
            />
          </InputWrapper>
          <InputWrapper>
            <MyTextInput
              autoComplete="on"
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
