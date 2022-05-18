import styled, { css } from "styled-components";

const overdueBorder = css`
  border-radius: 4px;
  border: 1px solid #c73431;
`;

const unassignedBorder = css`
  border-spacing: 8px 0;
  border-bottom: 2px solid #dfe1eb;
  margin: 4px 8px 0px;
  height: 208px;
`;

const normalBorder = css`
  border-radius: 4px;
  border: 1px solid #dfe1eb;
`;

const getBorder = (isUnassigned?: boolean, isOverdue?: boolean) => {
  if (isOverdue) {
    return overdueBorder;
  }
  if (isUnassigned) {
    return unassignedBorder;
  }
  return normalBorder;
};

const baseStyle = css`
  height: 200px;
  width: 230px;
  margin: 6px 11px;
  padding: 8px 8px 15px;
`;

export const StyledCard = styled.div<{
  isOverdue?: boolean;
  isUnassigned?: boolean;
  ref?: (element?: HTMLElement | null | undefined) => any;
}>`
  ${baseStyle}
  background-color: #fff;
  position: relative;

  ${(props) => getBorder(props.isUnassigned, props.isOverdue)}
`;

export const StripedCard = styled.div`
  ${baseStyle}
  background: repeating-linear-gradient(
    -45deg,
    #fff,
    #fff 13px,
    #f6f7fc 4px,
    #f6f7fc 17px
  );
`;
