import React from "react";
import styled from "styled-components";
import mark from "../../../images/mark.svg";
const TaskWrapper = styled.li`
  margin: 15px 0;
`;

const ListImage = styled.img`
  width: 10px;
`;
const TextWrapper = styled.span`
  padding-left: 10px;
`;
const SingleTask: React.FC = ({ children }) => {
  return (
    <TaskWrapper>
      <ListImage src={mark} />
      <TextWrapper>{children}</TextWrapper>
    </TaskWrapper>
  );
};

export default SingleTask;
