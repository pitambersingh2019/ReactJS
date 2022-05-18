import styled from "styled-components";

export const ArrowDownIcon = styled.img`
  height: 16px;
  cursor: pointer;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 8px;
  padding: 16px 8px 12px;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.lightGray6}`};
`;

export const SectionLabel = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  //max 1 line, ellipsis if more
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CountBox = styled.div`
  width: 32px;
  height: 24px;
  padding: 4px;
  border-radius: 4px;
  background-color: #edeffa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline-end: 12px;

  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CardsContainer = styled.div<{ open: boolean }>`
  max-height: ${(props) => (props.open ? "fit-content" : "0px")};
  transition: max-height 0.5s ease;
  background-color: ${(props) => props.theme.colors.lightGray2};
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;
