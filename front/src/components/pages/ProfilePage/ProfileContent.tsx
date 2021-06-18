import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { IUser } from "../../../redux/reducers/types";
import { ITheme } from "../../DarkMode/themes";
import Status from "../../Status/Status";
import StyledButton from "../../StyledButton/StyledButton";
import AddData from "./AddData";

const ContentWrapper = styled.div`
  flex: 1 1 350px;
  align-items: flex-start;
  padding: 10px 10px 20px 10px;
  background: ${({ theme }: { theme: ITheme }) => theme.secondary};

  border-radius: 10px;
  & td {
    padding: 6px 0;
  }
`;
const CustomTd = styled.td`
  font-weight: bold;
`;
const CustomTr = styled.tr`
  transition: 0.18s;
  &:hover {
    background: ${({ theme }: { theme: ITheme }) => theme.hover};
  }
`;
const CustomTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
const ProfileContent = ({
  isMe,
  user,
}: {
  isMe: boolean;
  user: IUser | null;
}) => {
  const history = useHistory();
  return (
    <ContentWrapper>
      <CustomTable>
        <CustomTr>
          <CustomTd>Полное имя</CustomTd>
          <td>{user?.fullName}</td>
        </CustomTr>
        <CustomTr>
          <CustomTd>Никнейм</CustomTd>
          <td>{user?.name}</td>
        </CustomTr>
        <CustomTr>
          <CustomTd>Статус</CustomTd>
          <td>
            <Status>{user?.teacher ? "преподаватель" : "студент"}</Status>
          </td>
        </CustomTr>
      </CustomTable>
      <AddData isMe={isMe} user={user} />

      <StyledButton
        onClick={() => history.push("/messages")}
        className="send-message__button"
        disabled={false}
      >
        Сообщение
      </StyledButton>
    </ContentWrapper>
  );
};

export default ProfileContent;
