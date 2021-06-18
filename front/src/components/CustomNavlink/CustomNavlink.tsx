import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ITheme } from "../DarkMode/themes";

const CustomNavLink = styled(NavLink)`
  color: ${({ theme }: { theme: ITheme }) => theme.text};
  text-decoration: none;
`;

export default CustomNavLink;
