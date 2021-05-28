import React from "react";
import { SearchResultWrapper } from "./UserSearchResult";
import LittleAva from "../../Course/LittleAva";
import styled from "styled-components";

type IGroup = {
  profession: string;
  year: number;
  short: string;
  _id: string;
};
const GroupDataContainer = styled.div``;


const GroupsSearchResult = ({ group }: { group: IGroup }) => {
  return (
    <SearchResultWrapper>
      <div>
        <LittleAva name={group.short} id={group._id} />
      </div>
      <GroupDataContainer>
        <div>{group.profession}</div>
        <div>{group.year} курс</div>
      </GroupDataContainer>
    </SearchResultWrapper>
  );
};

export default GroupsSearchResult;
