import React from "react";

import "./Loader.css";
import { ContentLoader, LoaderAnimation } from "./LoaderAnimation";

interface ILoader {
  border?: string;
  width?: string;
}
const Loader = ({ width = "96px", border = "10px" }: ILoader) => {
  return (
    <ContentLoader width={width} border={border}>
      <LoaderAnimation width={width} border={border}></LoaderAnimation>
      <LoaderAnimation width={width} border={border}></LoaderAnimation>
      <LoaderAnimation width={width} border={border}></LoaderAnimation>
      <LoaderAnimation width={width} border={border}></LoaderAnimation>
    </ContentLoader>
  );
};

export default Loader;
