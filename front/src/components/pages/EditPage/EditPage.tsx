import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  EAllowedToEditActionType,
  IAllowedToEditState,
} from "../../../redux/reducers/allowedToEdit";
import { IUser } from "../../../redux/reducers/types";
import { RootState } from "../../../redux/store";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Messgae";
import FormEditPage from "./FormEditPage";

const EditPage = () => {
  const dispatch = useDispatch();

  const { user }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );
  const { loading, error, data }: IAllowedToEditState = useSelector(
    (state: RootState) => state.allowedToEdit
  );
  const { id: idToEdit } = useParams<{ id: string }>();
  const idFromLogin = user?.id;
  useEffect(() => {
    dispatch({
      type: EAllowedToEditActionType.ALLOWED_TO_EDIT,
      payload: { idToEdit, idFromLogin },
    });
    return () => {
      dispatch({
        type: EAllowedToEditActionType.ALLOWED_TO_EDIT_RESET,
      });
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : null}
      {data && <FormEditPage data={user} />}
    </>
  );
};

export default EditPage;
