import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const ConditionRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  border: solid 1px #ebebeb;
  background-color: white;
  // width: 100%;
  min-width: 898px;
  max-width: 898px;
  ${rtl`
         padding: 5px 12px;
         margin: 24px 0 12px;
         box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  `}
`;
