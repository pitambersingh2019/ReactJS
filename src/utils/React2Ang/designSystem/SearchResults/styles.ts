import styled from "styled-components";
export const TableContainer = styled.div``;
export const TableWrapper = styled.div`
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #e3e3e3;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const FooterAzureMapping = styled.div`
  width: 100%;
  display: flex;
  /* position: absolute;
  bottom: 30px;
  left: 0; */
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 2;
  height: 62px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 12px;
  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
`;
