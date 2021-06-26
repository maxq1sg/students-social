import React, {
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import styles from "./NavBar.module.css";

import { SvgIconProps } from "@material-ui/core";
import "./NavBar.module.css";
import { NavLink } from "react-router-dom";


const Li = styled.li`
  margin-bottom: 20px;
  font-size: 20px;
  color: white;
`;
interface IProps {
  isOpen: boolean;
}
const CustomSpan = styled.span`
  visibility: ${(props: IProps) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props: IProps) => (props.isOpen ? 1 : 0)};
  display: ${(props: IProps) => !props.isOpen && "none"};
  transition: display 0.5s;
`;
interface IMenuItem {
  name: string;
  link: string;
  icon: (props: SvgIconProps) => JSX.Element;
}
const NavBarItem = ({
  menuItem,
  isOpen,
  setIsOpen,
}: {
  menuItem: IMenuItem;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const Icon = menuItem.icon;
  return (
    <Li
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <NavLink
        className={styles["link-name"]}
        activeClassName={styles.activeLink}
        to={menuItem.link}
        exact
      >
        <Icon className={styles.icon} />
        <CustomSpan isOpen={isOpen}>{menuItem.name}</CustomSpan>
      </NavLink>
    </Li>
  );
};

export default NavBarItem;
