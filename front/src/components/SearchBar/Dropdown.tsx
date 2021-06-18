import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  EScheduleActionType,
  EUserLogin,
  IUser,
} from "../../redux/reducers/types";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { EThemeActionTypes } from "../../redux/reducers/themeReducer";
import { ITheme } from "../DarkMode/themes";
import { RootState } from "../../redux/store";

interface IDropdown {
  isOpen: boolean;
  theme: ITheme;
}

const DropdownContainer = styled.div`
  position: absolute;
  color: white;
  background: ${({ theme }: IDropdown) => theme.main};
  top: 50px;
  left: 0;
  width: 100%;
  opacity: ${({ isOpen }: IDropdown) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }: IDropdown) => (isOpen ? "visible" : "hidden")};
  transform-origin: top center;
  transform: ${({ isOpen }: IDropdown) => (isOpen ? "scaleY(1)" : "scaleY(0)")};
  transition: opacity 0.4s ease, transform 0.5s ease, visibility 0.4s;
  z-index: 1000;
  box-shadow: 0 0 4px white;
`;

const DropdownItem = styled.li`
  cursor: pointer;
  padding: 5px 15px;

  transition: color 0.3s;
  &:hover {
    color: yellow;
  }
`;

const Dropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOPen] = useState(false);

  const logoutClickhandler = () => {
    dispatch({ type: EUserLogin.USER_LOGOUT });
    dispatch({ type: EScheduleActionType.RESET_SCHEDULE });
    localStorage.removeItem("login");
  };
  const pageClickEvent = (e: React.MouseEvent | MouseEvent) => {
    e.stopPropagation();
    setIsOPen((prev) => !prev);
  };

  const { user: loginedUser }: { user: IUser | null } = useSelector(
    (state: RootState) => state.login
  );

  const { dark } = useSelector((state: RootState) => state.theme);
  const changeThemeHanadler = () => {
    dispatch({ type: EThemeActionTypes.CHANGE_THEME });
  };
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isOpen]);
  return (
    <>
      <div>
        <MoreVertIcon onClick={pageClickEvent} />
      </div>
      <DropdownContainer isOpen={isOpen}>
        <ul>
          <DropdownItem onClick={logoutClickhandler}>Выйти</DropdownItem>
          <DropdownItem
            onClick={() => history.push(`/${loginedUser?.id}/edit`)}
          >
            Изменить профиль
          </DropdownItem>
          <DropdownItem onClick={changeThemeHanadler}>
            Сменить тему
          </DropdownItem>
        </ul>
      </DropdownContainer>
    </>
  );
};

export default Dropdown;
