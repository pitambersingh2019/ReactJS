import styled from "styled-components";
import IconCheckMark from "../../Table/SVG/CheckMark";
const IconCheckMarkStyled = styled(IconCheckMark)`
  width: 16px;
  height: 16px;
`;

const CheckMarkCell = ({ value }) => (value ? <IconCheckMarkStyled /> : null);
export default CheckMarkCell;
