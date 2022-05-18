import styled from "styled-components";
import IconCheckMark from "../../Table/SVG/CheckMark";
import IconCloseMark from "../../Table/SVG/CloseIcon";
const IconCheckMarkStyled = styled(IconCheckMark)`
  width: 16px;
  height: 16px;
`;
const IconCloseMarkStyled = styled(IconCloseMark)`
  width: 16px;
  height: 16px;
`;

const CheckMarkCell = ({ value }) =>
  value ? <IconCheckMarkStyled /> : <IconCloseMarkStyled />;
export default CheckMarkCell;
