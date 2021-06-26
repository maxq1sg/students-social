import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Avatar, makeStyles } from "@material-ui/core";
import styled from "styled-components";
import "./SearchBar.css";
import { IUser } from "../../redux/reducers/types";
import Dropdown from "./Dropdown";

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const UserInfoContainer = styled.div`
  padding: 0 6px;
  flex: 1 0;
`;
const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "45px",
    flex: "45px 1 0",
    background: "purple",
  },
}));

const MiniProfileContainer = styled.div`
  padding-left: 10px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const NameWrapper = styled.div`
  display: block;
  @media (max-width: 500px) {
    display: none;
  }
`;
const MiniProfile = () => {
  const classes = useStyles();
  const { user }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );

  return (
    <MiniProfileContainer>
      <Avatar className={classes.avatar}>
        {user && user.name[4].toUpperCase()}
      </Avatar>
      <UserInfoContainer>
        <NameWrapper>
          <UserName>{user?.name}</UserName>
          <div>{user?.teacher ? "Преподаватель" : "Студент"}</div>
        </NameWrapper>
      </UserInfoContainer>
      <Dropdown />
    </MiniProfileContainer>
  );
};

export default MiniProfile;
