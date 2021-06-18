import styled from "styled-components";
import { ITheme } from "../../../DarkMode/themes";

const SectionTitle = styled.h1`
  color: ${({ theme }: { theme: ITheme }) => theme.text};
  font-size: 3em;
  text-align: center;
  margin: 10px 0;
`;
const SubTitle = styled.h3`
  color: ${({ theme }: { theme: ITheme }) => theme.text};
  font-size: 1.5em;
  text-align: center;
  margin: 5px 0;
`;

export { SectionTitle, SubTitle };
