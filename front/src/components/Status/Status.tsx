import styled from "styled-components";
import { ITheme } from "../DarkMode/themes";

const Status = styled.div`
  color: ${({ theme }: { theme: ITheme }) => theme.status};
  margin-top: 8px;
`;

export default Status;
