import React from "react";
import styled from "styled-components";
import { IUser } from "../../../redux/reducers/types";
import { NavLink } from "react-router-dom";
import { ITheme } from "../../DarkMode/themes";
import CustomNavLink from "../../CustomNavlink/CustomNavlink";
import stringAnalyze from "./stringAnalyze";

const FlexWrapper = styled.div`
  margin-top: 15px;
  border-top: 1px solid black;
  display: flex;
  justify-content: space-evenly;
`;
const InfoContainer = styled.div`
  padding: 20px;
`;

const AddData = ({ isMe, user }: { isMe: boolean; user: IUser | null }) => {
  console.log(user?._id || user?.id);

  return (
    <FlexWrapper>
      <InfoContainer>
        <CustomNavLink to={`${user?._id || user?.id}/friends`}>
          {stringAnalyze(user?.friends.length || 0, "дру")}
        </CustomNavLink>
      </InfoContainer>
      <InfoContainer>
        <CustomNavLink to={`${user?._id || user?.id}/courses`}>
          {stringAnalyze(user?.courses?.length || 0, "курс")}
        </CustomNavLink>
      </InfoContainer>
    </FlexWrapper>
  );
};

export default AddData;
