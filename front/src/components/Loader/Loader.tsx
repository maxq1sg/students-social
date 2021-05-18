import React from "react";
import styled, { css, keyframes } from "styled-components";
import "./Loader.css";
import { ContentLoader, LoaderAnimation } from "./LoaderAnimation";

const Loader = (props: { border: string; width: string }) => {
  return (
    <ContentLoader {...props}>
      <LoaderAnimation {...props}></LoaderAnimation>
      <LoaderAnimation {...props}></LoaderAnimation>
      <LoaderAnimation {...props}></LoaderAnimation>
      <LoaderAnimation {...props}></LoaderAnimation>
    </ContentLoader>
  );
};

export default Loader;
