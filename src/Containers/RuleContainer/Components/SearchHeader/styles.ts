import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Searchheader = styled.div`
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
  padding-top: 38px;
  padding-bottom: 28px;
  color: black;

  ${rtl`
        padding-left: 10px;
  `}
`;
export const Searchheaderleft = styled.div`
  display: flex;
  align-items: center;
`;
export const Searchheaderrules = styled.div`
  align-items: center;
  ${rtl`
        margin-right: 20px;
  `}
  > .MuiSvgIcon-root {
    ${rtl`
          margin-left: auto;
          margin-right: 80px;
  `}
  }
`;

export const Searchheaderrulestitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
      text-align: left;
  `}

  color: #101010;
`;

export const Searchheaderrulessubtitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #707070;
`;
export const Searchheadersearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  text-align: center;
  display: flex;
  width: 400px;
  height: 40px;
  padding: 12px;
  // border: solid 1px #6c7481;
  border-radius: 6px;
  font-size: large;
  //:hover {
  //  border: solid 1px #1268fb;
  //}
  > input {
    font-size: 16px;
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    font-family: ${({ theme: { language } }) =>
      language === "eng" ? "ProximaNova" : "unset"};
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    ${rtl`
      text-align: left;
      margin-left: 5px;
  `}

    &:focus {
      outline: none;
    }
  }
`;
export const Searchheaderright = styled.div`
  display: flex;
  align-items: center;
`;

export const Searchbutton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  ${rtl`
          padding: 10px 12px;
          margin-left: 94px;
  `}

  height: 40px;
  width: 190px;
  background-color: #5900d3;
  color: white;
  border: 1px solid;
  border-radius: 6px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  > .MuiSvgIcon-root {
    font-size: 3.6rem;
    ${rtl`
          padding-right: 8px;
    `}
  }
`;
export const AddRuleTitle = styled.div`
  width: 100%;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
        text-align: left;
    `}
  color: #ffffff;
`;
