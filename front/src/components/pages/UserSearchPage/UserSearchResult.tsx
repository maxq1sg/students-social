import React from "react";
import styled from "styled-components";
import { IUser } from "../../../redux/reducers/types";
import LittleAva from "../../Course/LittleAva";
export const SearchResultWrapper = styled.div`
  box-shadow: 0 0 5px black;
  margin: 10px;
  padding:10px;
  display:flex
`;
// const FlexContainer = styled.div`
//   display: flex;
// `;
const FullName = styled.div`
  font-size: 1em;
`;
const Status = styled.div``
const DataContainer = styled.div`
  margin-left: 15px;
`;
const UserSearchResult = ({ user }: { user: IUser }) => {
  const id = user._id ?? "max";
  return (
    <SearchResultWrapper>
        <div>
          <LittleAva id={id} name={user.fullName} />
        </div>
        <DataContainer>
          <FullName>{user.fullName}</FullName>
          <Status>{user.teacher ? "преподаватель" : "студент"}</Status>
        </DataContainer>
    </SearchResultWrapper>
  );
};

export default UserSearchResult;
