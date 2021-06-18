import React from "react";
import styled, { css, keyframes } from "styled-components";
import { ITheme } from "../DarkMode/themes";

const loaderAnimation = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

type ILoaderProps = {
  width: string;
  border: string;
};

export const LoaderAnimation = styled.div`
box-sizing: border-box;
display: block;
position: absolute;
width: ${(props: ILoaderProps) => props.width};
height: ${(props: ILoaderProps) => props.width};
margin: 8px;
border: ${(props: ILoaderProps) => props.border} solid ${({ theme }: { theme: ITheme }) => theme.ava};
border-radius: 50%;
animation: ${(props: ILoaderProps) =>
  props.width
    ? css`
        ${loaderAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      `
    : ""}
border-color: ${({ theme }: { theme: ITheme }) => theme.ava} transparent transparent transparent;
&:nth-child(1) {
  animation-delay: -0.45s;
}
&:nth-child(2) {
  animation-delay: -0.3s;
}
&:nth-child(3) {
  animation-delay: -0.15s;
}
`;

export const ContentLoader = styled.div`
  display: inline-block;
  width: ${(props: ILoaderProps) => props.width};
  height: ${(props: ILoaderProps) => props.width};
`;
