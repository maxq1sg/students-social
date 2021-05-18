import React, { ReactElement } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { ReactNode } from "react";
import {SvgIconProps} from "@material-ui/core"
import { IState } from "./Navtypes";
import { RootState } from "../../redux/store";
import {useSelector} from "react-redux"


const Li = styled.li`
  margin-bottom: 20px;
  font-size: 20px;
  color: white;
`;
const Span = styled.span``;
interface IMenuItem {
  name: string,
  link: string,
  icon: (props: SvgIconProps) => JSX.Element
}
const NavBarItem = ({ menuItem }: { menuItem: IMenuItem }) => {
  const {open}:IState = useSelector<RootState>((state) => state.navbar) as IState;

  const Icon = menuItem.icon
  
  return (
    <Li>
      <NavLink
        className={styles["link-name"]}
        activeClassName={styles.activeLink}
        to={menuItem.link}
        exact
      >
        <Icon className={styles.icon}/>
        {open?menuItem.name:null}
      </NavLink>
    </Li>
  );
};

export default NavBarItem;
