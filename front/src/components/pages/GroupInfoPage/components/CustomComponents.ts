import styled from "styled-components";
import { ITheme } from "../../../DarkMode/themes";

export const CustomTable = styled.table`
border-collapse: collapse;
margin: 25px 0;
width:100%;
& tr {
    border-bottom: 1px solid ${({ theme }: { theme: ITheme }) => theme.text};
}
& td{
    padding: 15px;
    @media(max-width:500px){
        padding: 10px 4px;
    }
}
`

const a ="box-shadow: 0 0 20px rgba(0, 0, 0, 0.15)"