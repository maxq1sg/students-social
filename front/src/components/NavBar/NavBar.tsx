import React, { Dispatch, SetStateAction} from "react";
import styled from "styled-components";
import NavBarItem from "./NavBarItem";
import HomeIcon from "@material-ui/icons/Home";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SchoolIcon from "@material-ui/icons/School";
import { IUser } from "../../redux/reducers/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import GroupIcon from "@material-ui/icons/Group";

const Ul = styled.ul(
  (props: { isOpen: boolean }) => `
  margin: 0;
  text-align: ${props.isOpen ? "left" : "center"};
  margin-left: ${props.isOpen ? "40px" : "0"};
  margin-top: 50px;
  list-style: none;
  transition: 0.4s linear;
  min-height:100vh;
`
);
const NavBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );

  const menuItems = [
    { name: "Главная", link: `/${user?.id}`, icon: HomeIcon },
    { name: "Мои курсы", link: `/${user?.id}/courses`, icon: SchoolIcon },
    { name: "Расписание", link: "/schedule", icon: ScheduleIcon },
    { name: "Сообщения", link: "/messages", icon: MailOutlineIcon },
    { name: "Поиск", link: "/search", icon: SearchIcon },
    { name: "Друзья", link: `/${user?.id}/friends`, icon: GroupIcon },
  ];
  user?.teacher &&
    menuItems.push({
      name: "Создать курс",
      link: "/create-course",
      icon: CreateIcon,
    });
  return (
    <Ul isOpen={isOpen}>
      {menuItems.map((menuItem) => (
        <NavBarItem
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          key={menuItem.name}
          menuItem={menuItem}
        />
      ))}
    </Ul>
  );
};

export default NavBar;
