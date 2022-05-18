import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Popup = styled.div<{ id?: string }>`
  width: 272px;
  height: 216px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 40px 0 #000000;
  border: solid 1px #f3f3f4;
  padding-bottom: 16px;

  ${rtl`
        padding-left: 24px;
  `}

  .MuiSvgIcon-root {
    color: white;
    background-color: #e94f4f;
    width: 24px;
    height: 24px;
    border-radius: 20px;
    margin-top: 23px;
    ${rtl`
          padding: 2.7px 3.7px 2.2px 3.8px;
    `}
  }
`;

export const Popup_title = styled.div`
  height: 18px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.89;
  letter-spacing: normal;
  color: #101010;
  ${rtl`
            text-align: left;
            margin: 8px 0 16px 0;
  `}
`;

export const Popup_subTitle = styled.div`
  height: 54px;
  margin: 0 0 25px 0;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #101010;

  ${rtl`
       text-align: left;
  `}
`;

export const Popup_bottom = styled.div`
  display: flex;
  background-color: white;
`;
export const Popup_cancel = styled.div`
  display: flex;
  cursor: pointer;
  height: 32px;
  width: 88px;

  ${rtl`
        margin-left: 40px;
  `}
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: solid 1px #4a4a4a;
  background-color: white;
  color: #4a4a4a;
`;

export const Popup_delete = styled.div`
  display: flex;
  cursor: pointer;
  height: 32px;
  width: 88px;
  ${rtl`
        margin-left: 16px;
  `}
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background-color: #e94f4f;
  color: white;
`;
