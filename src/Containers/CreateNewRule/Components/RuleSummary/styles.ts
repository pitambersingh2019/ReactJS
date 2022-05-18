import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const SummaryContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 49px;
  height: 60vh;
  //height: 100%;
  min-width: 898px;
  max-width: 898px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    margin: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #e3e3e3;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SwitchTitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a4a4a;
  ${rtl`
          text-align: left;
          margin: 5px 26.1px 1px 0;
  `}
`;

export const SummaryRuleContainer = styled.div<{ marginTop: number }>`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin-top: ${(props) => props.marginTop}px;
  border-radius: 4px;
  border: solid 1px #ebebeb;
  padding-top: 15px;
  ${rtl`
        padding-left: 25px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  `}
`;
export const SummaryTitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0080ff;
  ${rtl`
        text-align: left;
        margin: 0 104px 0 0;
  `}
`;

export const LineRule = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .MuiSvgIcon-root {
    cursor: pointer;
    color: #0080ff;
    font-size: large;

    ${rtl`
        padding-right: 22px;
    `}
  }
`;

export const Title = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a4a4a;
  ${rtl`
          text-align: left;
          margin: 0 160px 0 0;
          padding: 0 143px 0 0;
    `}
  margin-top: 16px;
  margin-bottom: 8px;
`;
export const SubTitle = styled.div<{ trigger: boolean }>`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: ${(props) => (props.trigger ? 16 : 16)}px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #757575;
  ${rtl`
          text-align: left;
          margin: 0 37px 12px 0;
  `}
`;

export const Line = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  opacity: 0.5;
  border: solid 0.5px rgba(112, 112, 112, 0.23);
`;

export const GroupRowContainer = styled.div`
  width: 100%;
`;

export const AndText = styled.div`
  position: absolute;
  align-self: center;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #d1d1d1;
  padding: 4px;
  background-color: white;
`;
export const LineContainer = styled.div<{ first?: boolean; or?: boolean }>`
  display: flex;
  justify-content: center;
  margin-right: ${(props) => (props.first ? 30 : 0)}px;
  margin-top: 16px;
  margin-bottom: ${(props) => (props.or ? 12 : 4)}px;
`;

export const SeeMoreContainer = styled.div`
  display: flex;
  margin: 0.8px 3.7px 18px 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: left;
  color: #0768ff;

  > .MuiSvgIcon-root {
    margin-left: 4px;
  }
`;

export const ListGroupContainer = styled.div``;
