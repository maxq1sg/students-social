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

const ProfileFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const {
    loading: usersLoading,
    error: usersError,
    user,
  } = useSelector((state: RootState): IGetUserState => state.profile);
  useEffect(() => {
    dispatch({ type: EGetUserActionType.GET_USER, payload: { id } });
    return () => {
      dispatch({ type: EGetUserActionType.GET_USER_RESET });
    };
  }, []);
  return (
    <div>
      {usersLoading ? (
        <Loader />
      ) : usersError ? (
        <Message severity={"error"}>{usersError}</Message>
      ) : user ? (
        <ProfileFlexContainer>
          <ProfileAvatar {...user} />
          <ProfileContent {...user} />
        </ProfileFlexContainer>
      ) : null}
    </div>
  );
};

export default ProfilePage;
