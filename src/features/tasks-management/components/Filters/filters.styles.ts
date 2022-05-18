import styled from "styled-components";

export const Wrapper = styled.div<{ maxHeight: number }>`
  width: 256px;
  min-width: 256px;
  margin-inline-start: 2.5px;
  margin-inline-end: -12px;
  box-shadow: -3px 0 10px 0 rgba(0, 0, 0, 0.04);
  background-color: ${(props) => props.theme.colors.white};
  padding: 8px 16px 0;
  display: flex;
  flex-direction: column;
  height: ${(props) => `${props.maxHeight}px`};
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SectionLabel = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #101010;
`;
