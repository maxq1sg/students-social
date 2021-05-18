import React, { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Avatar, Button, makeStyles } from "@material-ui/core";
import styled from "styled-components";
import "./SearchBar.css";
import { IUser } from "../../redux/reducers/types";
import Dropdown from "./Dropdown";
const CustomAvatar = styled(Avatar)`
  height: 100px;
  background-color: orange;
`;

const StyledButton = styled(Button)`
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
`;
const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const UserInfoContainer = styled.div`
  padding: 0 18px;
`;
const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "45px",
    width: "45px",
    background: "purple",
  },
}));

const MiniProfileContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const MiniProfile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const classes = useStyles();
  const { user }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );

  const clickHandler = () => {
    setDropdownOpen((prev) => !prev);
  };
  return (
    <MiniProfileContainer>
      <Avatar className={classes.avatar}>
        {user && user.name[0].toUpperCase()}
      </Avatar>
      <UserInfoContainer>
        <UserName>{user?.name}</UserName>
        <div>{user?.teacher ? "Преподаватель" : "Студент"}</div>
      </UserInfoContainer>
      <MoreVertIcon onClick={clickHandler} />
      {dropdownOpen && <Dropdown />}
    </MiniProfileContainer>
  );
};

export default MiniProfile;
