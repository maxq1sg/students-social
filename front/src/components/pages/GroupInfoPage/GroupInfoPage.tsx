import React from "react";
import styled from "styled-components";
import GroupCourses from "./components/GroupCourses";
import GroupMainInfo from "./components/GroupMainInfo";
import GroupMembers from "./components/GroupMembers";
import { SectionTitle } from "./components/SectionTitle";
const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const GroupInfoPage = () => {
  return (
    <>
      <SectionTitle>Информация о группе</SectionTitle>
      <FlexContainer>
        <GroupMainInfo />
        <GroupCourses />
      </FlexContainer>
      <SectionTitle>Члены группы</SectionTitle>
      <GroupMembers />
    </>
  );
};

export default GroupInfoPage;
