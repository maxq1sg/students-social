import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EGetFriendsActionType } from "../../../redux/reducers/getFriendsReducer";
import { RootState } from "../../../redux/store";
import UserSearchResult from "../UserSearchPage/UserSearchResult";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Messgae";
import styled from "styled-components";
import { ITheme } from "../../DarkMode/themes";

const SearchResults = styled.div`
  margin-top: 20px;
  font-size: 1.5em;
  font-weight: bold;
  color: ${({ theme }: { theme: ITheme }) => theme.text};
  padding-bottom: 15px;
`;

const FriendsPage = () => {
  const { error, friends, loading } = useSelector(
    (state: RootState) => state.friendsList
  );
  const dispatch = useDispatch();
  const { id: userId } = useParams<{ id: string }>();
  useEffect(() => {
    dispatch({ type: EGetFriendsActionType.GET_FRIENDS, payload: { userId } });
    return () => {
      dispatch({ type: EGetFriendsActionType.FRIENDS_RESET });
    };
  }, []);

  return (
    <>
      <SearchResults>{`Друзья пользователя`}</SearchResults>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : friends?.length === 0 ? (
        <Message severity="info">
          {"На данный момент нет друзей!"}
        </Message>
      ) : (
        friends?.map((friend) => <UserSearchResult user={friend} />)
      )}
    </>
  );
};

export default FriendsPage;
