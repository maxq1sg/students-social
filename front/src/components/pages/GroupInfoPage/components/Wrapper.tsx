import styled from "styled-components";
import { ITheme } from "../../../DarkMode/themes";

const GroupMainInfoContainer = styled.div`
  background: ${({ theme }: { theme: ITheme }) => theme.secondary};
  border-radius: 15px;
  flex: 1 1 250px;
  padding: 15px;
  margin: 10px;
  @media (max-width: 500px) {
    margin: 10px 0px;
    padding: 5px;
  }
`;
export default GroupMainInfoContainer;
