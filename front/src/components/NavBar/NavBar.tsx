import React, { useState } from "react";
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
import { MenuItem } from "@material-ui/core";

const Ul = styled.ul(
  (props: { open: boolean }) => `
  margin: 0;
  text-align: ${props.open ? "left" : "center"};
  margin-left: ${props.open ? "40px" : "0"};
  margin-top: 50px;
  list-style: none;
`
);
const NavBar = ({ open }: { open: boolean }) => {
  const { user }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );
  const menuItems = [
    { name: "Главная", link: "/", icon: HomeIcon },
    { name: "Мои курсы", link: "/courses", icon: SchoolIcon },
    { name: "Расписание", link: "/schedule", icon: ScheduleIcon },
    { name: "Сообщения", link: "/messages", icon: MailOutlineIcon },
  ];
  user?.teacher &&
    menuItems.push({
      name: "Создать курс",
      link: "/create-course",
      icon: CreateIcon,
    });
  return (
    <Ul open={open}>
      {menuItems.map((menuItem) => (
        <NavBarItem key={menuItem.name} menuItem={menuItem} />
      ))}
    </Ul>
  );
};

export default NavBar;
