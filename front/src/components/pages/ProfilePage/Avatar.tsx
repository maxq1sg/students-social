import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import ava from "../../../images/default-ava.jpg";
import { IGetUserState } from "../../../redux/reducers/getUserReducer";
import { RootState } from "../../../redux/store";
import StyledButton from "../../StyledButton/StyledButton";

const ProfileWrapper = styled.div`
  margin: 0 15px 15px 0;
  flex: 1 1 250px;
  background: white;
  padding: 10px 10px 20px 10px;
  border-radius: 10px;
`;
const AvatarPhoto = styled.div`
  background: url(${ava}) center/cover no-repeat;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin-bottom: 15px;
`;
const ProfileAvatar = ({ ...user }) => {
  const history = useHistory();

  const clickEditHandler = () => {
    history.push(`/${user?._id}/edit`);
  };
  return (
    <ProfileWrapper>
      <AvatarPhoto />
      <StyledButton
        onClick={clickEditHandler}
        className="other_button"
        disabled={false}
      >
        Редактировать
      </StyledButton>
    </ProfileWrapper>
  );
};

export default ProfileAvatar;
