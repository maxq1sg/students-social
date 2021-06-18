import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import bsu from "../../images/bsu.jpg";
import pant from "../../images/marco-pantani.jpg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import styles from "./NavBar.module.css";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { NavConst } from "../../redux/types/navbarTypes";
import { IState } from "./Navtypes";

const Container = styled.div`
  min-height: 100vh;
  background: #0d3670;
  flex: 50px 0 1;
`;

const FixedContainer = styled.div`
  min-height: 100vh;
  background: #0d3670;
  position: fixed;
  z-index: 10000;
  width: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "240px" : "50px")};
`;
const LogoArrow = styled.div(
  (props: { isOpen: boolean }) => `
  position: absolute;
  top: 20px;
  right: ${props.isOpen ? "18px" : "50%"};
  transform: translateX(50%)
`
);

const LogoImage = styled.div(
  (props: { isOpen: boolean }) => `
  margin-top: 30px;
  background: url(${bsu}) center/cover no-repeat;

  width: ${props.isOpen ? "100%" : "0"};
  height: 100px;
  transition: 0.4s linear;

`
);

const NavBarContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const changeOpen = () => {
    // dispatch({ type: NavConst.CHANGE_NAVBAR });
    setIsOpen((prev) => !prev);
  };
  return (
    <Container>
      <FixedContainer isOpen={isOpen}>
        <LogoImage isOpen={isOpen} />
        <LogoArrow isOpen={isOpen}>
          {isOpen ? (
            <ArrowBackIosIcon onClick={changeOpen} className={styles.arrow} />
          ) : (
            <ArrowForwardIosIcon
              onClick={changeOpen}
              className={styles.arrow}
            />
          )}
        </LogoArrow>
        <NavBar setIsOpen={setIsOpen} isOpen={isOpen} />
      </FixedContainer>
    </Container>
  );
};

export default NavBarContainer;
