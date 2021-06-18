import React from "react";
import { SearchResultWrapper } from "./UserSearchResult";
import LittleAva from "../../Course/LittleAva";
import styled from "styled-components";
import { IGroup } from "../../../redux/reducers/types";


const GroupDataContainer = styled.div`
  padding-left: 20px;
`;

const GroupsSearchResult = ({ group }: { group: IGroup }) => {
  return (
    <SearchResultWrapper>
      <div>
        <LittleAva
          isPerson={false}
          letter={group.short.split("-")[0]}
          id={group._id}
        />
      </div>
      <GroupDataContainer>
        <div>{group.profession}</div>
        <div>{group.year} курс</div>
      </GroupDataContainer>
    </SearchResultWrapper>
  );
};

export default GroupsSearchResult;
