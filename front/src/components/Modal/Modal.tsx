import React from "react";
import { useDispatch} from "react-redux";
import styled, {  css } from "styled-components";
import { ITheme } from "../DarkMode/themes";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { EModalActions } from "../../redux/reducers/modalReducer";
import { ReactNode } from "react";
type ModalType = "error" | "success";

const ModalContainer = styled.div`
  text-align: center;
  position: fixed;
  padding: 20px 40px;
  border-radius: 8px;
  top: 80px;
  left: 50%;
  ${({
    theme,
    type,
    open,
  }: {
    theme: ITheme;
    type: ModalType;
    open: boolean;
  }) =>
    open
      ? css`
          transform: translate(-50%, -50%) scale(1);
        `
      : css`
          transform: translate(-50%, -50%) scale(0);
        `};
  transition: 0.5s transform;
  background: ${({
    theme,
    type,
    open,
  }: {
    theme: ITheme;
    type: ModalType;
    open: boolean;
  }) => (type === "error" ? theme.red : theme.green)};
  color: black;
`;
const CustomIcon = styled(HighlightOffIcon)`
  color: blue;
  position: absolute;
  top: 0px;
  right: 0px;
`;

const Modal = ({
  children,
  type = "success",
  open,
}: {
  children: ReactNode;
  type?: ModalType;
  open: boolean;
}) => {
  const dispatch = useDispatch();
  const closeClickHandler = () => {
    dispatch({ type: EModalActions.CLOSE_MODAL });
  };
  return (
    <ModalContainer open={open} type={type}>
      {open && (
        <>
          {children}
          <CustomIcon onClick={closeClickHandler} />
        </>
      )}
    </ModalContainer>
  );
};

export default Modal;
