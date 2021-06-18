import React from "react";
import styled from "styled-components";
import { IUser } from "../../../redux/reducers/types";
import LittleAva from "../../Course/LittleAva";
import { ITheme } from "../../DarkMode/themes";
import Status from "../../../components/Status/Status";
import { NavLink } from "react-router-dom";
import CustomNavLink from "../../CustomNavlink/CustomNavlink";
export const SearchResultWrapper = styled.div`
  box-shadow: ${({ theme }: { theme: ITheme }) => theme.shadow};
  margin: 10px;
  padding: 10px;
  display: flex;
  background: ${({ theme }: { theme: ITheme }) => theme.secondary};
`;
// const FlexContainer = styled.div`
//   display: flex;
// `;
const FullName = styled.div`
  font-size: 1em;
`;
const DataContainer = styled.div`
  margin-left: 15px;
`;
const UserSearchResult = ({ user }: { user: IUser }) => {
  const id = user._id ?? "max";
  return (
    <SearchResultWrapper>
      <div>
        <LittleAva isPerson={true} id={id} letter={user.fullName[0]} />
      </div>
      <DataContainer>
        <FullName>
          <CustomNavLink to={`/${id}`}>{user.fullName}</CustomNavLink>
        </FullName>
        <Status>{user.teacher ? "преподаватель" : "студент"}</Status>
      </DataContainer>
    </SearchResultWrapper>
  );
};

export default UserSearchResult;
