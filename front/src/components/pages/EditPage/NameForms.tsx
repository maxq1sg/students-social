import React from "react";
import MyTextInput from "./MyTextInput";
import { Formik, Form } from "formik";
import { userDataValidation } from "./validationSchema";
import { EUserLogin, IUser } from "../../../redux/reducers/types";
import styled from "styled-components";
import StyledButton from "../../StyledButton/StyledButton";
import { useDispatch, useSelector } from "react-redux";
import { EEditNameActionType } from "../../../redux/reducers/editNameReducer";
import { RootState } from "../../../redux/store";
import Message from "../../Message/Messgae";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { EModalActions } from "../../../redux/reducers/modalReducer";

const InputWrapper = styled.div`
  margin: 10px 0;
`;

const NameForms = ({ data }: { data: IUser }) => {
  const history = useHistory();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.editName
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      dispatch({ type: EUserLogin.USER_NAME_MODIFY, payload: { ...success } });
      history.push(`/${data.id}`);
      setTimeout(() => {
        dispatch({
          type: EModalActions.OPEN_MODAL,
          payload: "Изменения внесены!",
        });
      }, 300);
    }
  }, [success, data.id, dispatch, history]);
  useEffect(() => {
    return () => {
      dispatch({ type: EEditNameActionType.EDIT_NAME_RESET });
    };
  }, [dispatch]);
  return (
    <>
      <Formik
        initialValues={{
          fullName: data.fullName,
          name: data.name,
          password: "",
        }}
        validationSchema={userDataValidation}
        onSubmit={(values, { setSubmitting }) => {
          dispatch({
            type: EEditNameActionType.EDIT_NAME,
            payload: { ...values, id: data.id, token: data.token },
          });
        }}
      >
        <Form>
          <InputWrapper>
            <MyTextInput
              label=""
              name="fullName"
              type="text"
              placeholder="Полное имя"
              autoComplete="on"
            />
          </InputWrapper>
          <InputWrapper>
            <MyTextInput
              label=""
              name="name"
              type="text"
              placeholder="имя"
              autoComplete="on"
            />
          </InputWrapper>
          <InputWrapper>
            <MyTextInput
              autoComplete="on"
              label=""
              name="password"
              type="password"
              placeholder="Пароль,чтобы изменения вступили в силу"
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

export default NameForms;
