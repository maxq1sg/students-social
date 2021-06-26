import React from "react";

import styled from "styled-components";
import ava from "../../../images/default-ava.jpg";
import { IUser } from "../../../redux/reducers/types";
import { ITheme } from "../../DarkMode/themes";
import UniversalButton from "./UniversalButton";

const ProfileWrapper = styled.div`
  margin: 10px;
  flex: 1 1 250px;
  background: ${({ theme }: { theme: ITheme }) => theme.secondary};
  padding: 10px 10px 20px 10px;
  border-radius: 10px;
`;
const AvatarPhoto = styled.div`
  background: url(${ava}) center/cover no-repeat;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin-bottom: 15px;
  @media (max-width: 368px) {
    height: 150px;
  }
`;
const ProfileAvatar = ({ user }: { user: IUser | null }) => {
  return (
    <ProfileWrapper>
      <AvatarPhoto />
      <UniversalButton user={user} />
    </ProfileWrapper>
  );
};

export default ProfileAvatar;
