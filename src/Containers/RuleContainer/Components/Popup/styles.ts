import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Popup = styled.div<{ id?: number }>`
  border-radius: 6px;
  height: 100%;
  width: 100%;
  ${rtl`
    place-items: start;
  `}
`;
export const Popuptitlecontainer = styled.div`
  height: 67px;
  margin-top: 92px;
  background-color: white;
  justify-items: center;
`;
export const Popuptitle = styled.div`
  height: 33px;
  width: 200px;
  padding-top: 15px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #101010;
  background-color: white;
  ${rtl`
    text-align: left;
    padding-left: 44px;
  `}
`;

export const Popupbottom = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background-color: white;
  align-content: space-between;
  ${rtl`
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
  `}
`;
export const Popupcancel = styled.div`
  display: flex;
  cursor: pointer;
  flex: 1;
  align-content: center;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: grey;
  padding-top: 11px;
  padding-bottom: 11px;
  border-top: 1px solid rgba(112, 112, 112, 0.1);
  ${rtl`
        border-right: 1px solid rgba(112, 112, 112, 0.1);
        border-bottom-left-radius: 6px;
  `}
`;

export const Popupdelete = styled.div`
  display: flex;
  cursor: pointer;
  flex: 1;
  border-top: 1px solid rgba(112, 112, 112, 0.1);
  align-content: center;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  color: #e94f4f;
  padding-top: 11px;
  padding-bottom: 11px;
  ${rtl`
         text-align: left;
         border-left: 1px solid rgba(112, 112, 112, 0.1);
         border-bottom-right-radius: 6px;

  `}
`;
