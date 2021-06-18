import React from "react";
import styled from "styled-components";
import { ITheme } from "../DarkMode/themes";
import Input from "./Input";
import MiniProfile from "./MiniProfile";
const SearchBarFlex = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 0 50px;
  background: ${({ theme }: { theme: ITheme }) => theme.primary};
  @media (max-width: 500px) {
    padding: 0 20px;
  }
`;

const SearchBar = () => {
  return (
    <SearchBarFlex>
      <Input />
      <MiniProfile />
    </SearchBarFlex>
  );
};

export default SearchBar;
