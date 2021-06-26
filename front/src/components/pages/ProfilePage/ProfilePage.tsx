import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { EGetUserActionType } from "../../../redux/reducers/getUserReducer";
import { RootState } from "../../../redux/store";
import { IGetUserState } from "../../../redux/reducers/getUserReducer";
import Message from "../../Message/Messgae";
import Loader from "../../Loader/Loader";
import ProfileAvatar from "./Avatar";
import ProfileContent from "./ProfileContent";
import styled from "styled-components";
import { IUser } from "../../../redux/reducers/types";
import Modal from "../../Modal/Modal";
import { EModalActions } from "../../../redux/reducers/modalReducer";

const ProfileFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

function getProfileStructure(isMe: boolean, user: IUser | null) {
  return (
    <ProfileFlexContainer>
      <ProfileAvatar user={user} />
      <ProfileContent isMe={isMe} user={user} />
    </ProfileFlexContainer>
  );
}

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const {
    loading: usersLoading,
    error: usersError,
    user: userProfile,
  } = useSelector((state: RootState): IGetUserState => state.profile);
  const { open, text } = useSelector((state: RootState) => state.modal);

  const { user: loginedUser }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );
  const isMe = loginedUser?.id === id;
  useEffect(() => {
    if (!isMe) {
      dispatch({ type: EGetUserActionType.GET_USER, payload: { id } });
    }
    return () => {
      dispatch({ type: EGetUserActionType.GET_USER_RESET });
      dispatch({ type: EModalActions.CLOSE_MODAL });
    };
  }, [id, isMe, dispatch]);
  useEffect(() => {
    if (open) {
      const timerId = setTimeout(() => {
        dispatch({ type: EModalActions.CLOSE_MODAL });
      }, 6000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [open, dispatch]);
  return (
    <div>
      {<Modal open={open}>{text}</Modal>}
      {!isMe ? (
        usersLoading ? (
          <Loader />
        ) : usersError ? (
          <Message severity={"error"}>{usersError}</Message>
        ) : userProfile ? (
          getProfileStructure(isMe, userProfile)
        ) : null
      ) : (
        getProfileStructure(isMe, loginedUser)
      )}
    </div>
  );
};

export default ProfilePage;
