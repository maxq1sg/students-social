import { ITheme } from './themes';
import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }:{theme:ITheme}) => theme.primary};
    color: ${({ theme }:{theme:ITheme}) => theme.colorReverse};

  }
  `
    // transition: all 0.50s linear;
