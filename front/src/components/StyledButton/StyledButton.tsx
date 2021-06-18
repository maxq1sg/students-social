import styled from "styled-components";
interface ItemProps {
  disabled: boolean;
}
const StyledButton = styled.button.attrs<ItemProps>(({ disabled }) => ({
  disabled,
}))`
  border: none;
  border-radius: 3px;
  padding: 6px 10px;
  font-size: 14px;
  background: #0d3670;
  color: white;
  text-transform: uppercase;
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
  &:hover {
    opacity: 0.85;
  }
  box-shadow: 0 0 2px white;
`;
export default StyledButton;
