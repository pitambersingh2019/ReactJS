import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #f0edff;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
`;

export const CollapsHeaderLeft = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #050709;
  display: flex;
  align-items: center;
`;

export const CollpasHeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Percentage = styled.p`
  color: #1268fb;
  font-size: 16px;
  font-weight: 500;
  ${(props) =>
    props.theme.dir === "rtl" ? `margin-right: 9px;` : `margin-left: 9px;`}
  margin-bottom: 0;
  padding: 4px 9px;
  background: #ffffff;
  border: solid 1px #eff0f5;
  width: 50px;
  text-align: center;
`;
