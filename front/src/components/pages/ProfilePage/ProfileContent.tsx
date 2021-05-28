import React from "react";
import styled from "styled-components";
import { IUser } from "../../../redux/reducers/types";
import StyledButton from "../../StyledButton/StyledButton";

const ContentWrapper = styled.div`
  flex: 1 1 350px;
  align-items: flex-start;
  background: white;
  padding: 10px 10px 20px 10px;
  border-radius: 10px;
`;

const ProfileContent = ({ ...user }) => {
  return (
    <ContentWrapper>
      <table>
        <tr>
          <td>Полное имя</td>
          <td>{user.fullName}</td>
        </tr>
        <tr>
          <td>Никнейм</td>
          <td>{user.name}</td>
        </tr>
        <tr>
          <td>Статус</td>
          <td>{user.teacher ? "преподаватель" : "студент"}</td>
        </tr>
      </table>
      <StyledButton
        onClick={() => {}}
        className="send-message__button"
        disabled={false}
      >
        Сообщение
      </StyledButton>
    </ContentWrapper>
  );
};

export default ProfileContent;
