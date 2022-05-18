import styled from "styled-components";
export const TableContainer = styled.div``;
export const TableWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  /* gap: 10px; */
  position: relative;
  /* justify-content: space-between; */
`;

export const CancelButton = styled.button`
  width: 98px;
  height: 40px;
  width: 150px;
  padding: 8px 24px;
  border-radius: 4px;
  border: solid 1px #5900d3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #5900d3;
  cursor: pointer;
  user-select: none;

  /* &:hover {
    border: solid 1px #104fbc;
    color: #104fbc;
  } */
`;

export const SaveChangesButton = styled.button<{ active: boolean }>`
  padding: 12px 20px;
  height: 40px;
  width: 150px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#5900d3" : "#ad9ebe")};
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  align-items: center;
  text-align: center;
  border: none;
  color: white;
  &:hover {
    background-color: ${(props) => (props.active ? "#5900d3" : "#ad9ebe")};
  }
`;
export const SubmitButton = styled.button<{ active: boolean }>`
  padding: 12px 20px;
  height: 40px;
  width: 170px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#5900d3" : "#ad9ebe")};
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  align-items: center;
  text-align: center;
  border: none;
  color: white;
  &:hover {
    background-color: ${(props) => (props.active ? "#5900d3" : "#ad9ebe")};
  }
`;
export const FooterWrapper = styled.div`
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
