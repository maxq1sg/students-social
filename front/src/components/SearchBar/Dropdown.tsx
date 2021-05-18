import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { EScheduleActionType, EUserLogin } from "../../redux/reducers/types";
const DropdownContainer = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
`;

const Dropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutClickhandler = () => {
    dispatch({ type: EUserLogin.USER_LOGOUT });
    dispatch({ type: EScheduleActionType.RESET_SCHEDULE });
    localStorage.removeItem("login");
  };
  return (
    <DropdownContainer>
      <ul>
        <li onClick={logoutClickhandler}>Выйти</li>
        <li onClick={() => history.push("/settings")}>Профиль</li>
      </ul>
    </DropdownContainer>
  );
};

export default Dropdown;
