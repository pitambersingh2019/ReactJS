import styled from "styled-components";

export const SectionOptionsContainer = styled.div<{ open: boolean }>`
  max-height: ${(props) => (props.open ? "300px" : "0px")};
  transition: max-height 0.5s ease;
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchWrapper = styled.div`
  margin-top: -4px;
  margin-bottom: 8px;
`;
