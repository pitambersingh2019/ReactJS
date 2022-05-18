import styled from "styled-components";

export const ModalContainer = styled.div`
  position: absolute;
  top: 24;
  min-width: 112px;
  max-height: 195px;
  z-index: 100;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  background-color: ${(props) => props.theme.colors.white};
  padding: 0 8px 8px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #f6f6f6;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Item = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #101010;
  padding-top: 8px;
`;
