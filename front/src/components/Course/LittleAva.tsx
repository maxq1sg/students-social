import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ITheme } from "../DarkMode/themes";

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }: { theme: ITheme }) => theme.ava};
  color: ${({ theme }: { theme: ITheme }) => theme.avaColor};
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  border-radius: 50%;
`;
const AvaContainer = styled.div`
  margin: 0 2px;
`;
const LittleAva = ({
  letter,
  id,
  content,
  isPerson = true,
}: {
  content?: string;
  id: string;
  letter: string;
  isPerson?: boolean;
}) => {
  return (
    <AvaContainer>
      <Link className="link" to={isPerson ? `/${id}` : `/groups/${id}`}>
        <Avatar title={content}>{letter}</Avatar>
      </Link>
    </AvaContainer>
  );
};

export default LittleAva;
