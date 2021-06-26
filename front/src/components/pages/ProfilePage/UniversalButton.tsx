import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import {
  EAddToFriendsActionType,
  IaddToFriendsState,
} from "../../../redux/reducers/addToFriendsReducer";
import { IGetUserState } from "../../../redux/reducers/getUserReducer";
import { EUserLogin, IUser } from "../../../redux/reducers/types";
import { RootState } from "../../../redux/store";
import StyledButton from "../../StyledButton/StyledButton";

enum ButtonTitle {
  add = "Добавить в друзья",
  remove = "Удалить из друзей",
}

const UniversalButton = ({ user }: { user: IUser | null }) => {
  const history = useHistory();
  const { id: pathId } = useParams<{ id: string }>();
  const { loading: friendsLoading, done }: IaddToFriendsState = useSelector(
    (state: RootState) => state.friends
  );
  const { user: loginedUser }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );
  const { user: profileUser } = useSelector(
    (state: RootState): IGetUserState => state.profile
  );
  const areOnMountFriends = profileUser?.friends.includes(loginedUser?.id);
  const getInitialTitle = () => {
    if (areOnMountFriends) {
      return ButtonTitle.add;
    } else return ButtonTitle.remove;
  };
  const [title, setTitle] = useState(getInitialTitle());

  const toggleTitle = () => {
    if (title === ButtonTitle.add) {
      setTitle(ButtonTitle.remove);
    } else {
      setTitle(ButtonTitle.add);
    }
  };
  useEffect(() => {
    toggleTitle();
  }, []);

  useEffect(() => {
    if (done) {
      toggleTitle();
    }
  }, [done]);

  const first = user?._id;
  const second = loginedUser?.id;
  const isMyProfile = pathId === second;
  const dispatch = useDispatch();
  const clickEditHandler = () => {
    if (isMyProfile) {
      history.push(`/${pathId}/edit`);
    } else {
      dispatch({
        type: EAddToFriendsActionType.ADD_TO_FRIENDS,
        payload: { first, second },
      });
      dispatch({
        type: EUserLogin.USER_FRIEND,
        payload: {
          isAdd: !areOnMountFriends,
          user: first,
        },
      });
    }
  };
  return (
    <>
      <StyledButton
        onClick={clickEditHandler}
        className="other_button"
        disabled={friendsLoading}
      >
        {friendsLoading ? "Загрузка..." : isMyProfile ? "Редактировать" : title}
      </StyledButton>
    </>
  );
};

export default UniversalButton;
