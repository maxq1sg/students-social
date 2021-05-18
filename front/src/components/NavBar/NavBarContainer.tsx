import React from "react";
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

const Container = styled.div(
  (props: { open: boolean }) => `
  min-height:100vh;
  flex-basis: ${props.open ? "240px" : "50px"};
  flex-shrink: 0;
  background: #0d3670;
  position: relative;
  transition: 0.4s linear;
`
);
const LogoArrow = styled.div(
  (props: { open: boolean }) => `
  position: absolute;
  top: 20px;
  right: ${props.open ? "18px" : "50%"};
  transform: translateX(50%)
`
);

const LogoImage = styled.div(
  (props: { open: boolean }) => `
  margin-top: 30px;
  background: url(${bsu}) center/cover no-repeat;

  width: ${props.open ? "100%" : "0"};
  height: 100px;
`
);

const NavBarContainer = () => {
  const { open }: IState = useSelector<RootState>(
    (state) => state.navbar
  ) as IState;
  const dispatch = useDispatch();
  const changeOpen = () => {
    dispatch({ type: NavConst.CHANGE_NAVBAR });
  };
  console.log(open);
  return (
    <Container open={open}>
      <div style={{ border: "1px solid grey" }}>
        <LogoImage open={open} />
        <LogoArrow open={open}>
          {open ? (
            <ArrowBackIosIcon onClick={changeOpen} className={styles.arrow} />
          ) : (
            <ArrowForwardIosIcon
              onClick={changeOpen}
              className={styles.arrow}
            />
          )}
        </LogoArrow>
        <NavBar open={open} />
      </div>
    </Container>
  );
};

export default NavBarContainer;
