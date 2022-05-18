import styled, { css } from "styled-components";
import { device } from "../../utils/devices";
import { PAGE } from "./index";
// import Background1024Login from "./background/April_Release_login_1024.jpg";
// import Background1336Login from "./background/April_Release_login_1336.jpg";
// import Background1920Login from "./background/April_Release_login_1920.jpg";
// import Background1024Register from "./background/April_Release_signup_1024.jpg";
// import Background1336Register from "./background/April_Release_signup_1336.jpg";
// import Background1920Register from "./background/April_Release_signup_1920.jpg";
// @ts-ignore
import rtl from "styled-components-rtl";
export const Container = styled.div<{
  page: string;
  BackgroundLarge: string;
  BackgroundMed: string;
  Backgroundsmall: string;
}>`
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: start;
  align-items: center;
  ${rtl`
      padding-left: 40px;
    `}
  @media ${device.laptop} {
    ${rtl`
      padding-left: 40px;
    `}

    ${(p) =>
      p.page === PAGE.SIGNUP
        ? css`
            background-image: url(${p.Backgroundsmall});
          `
        : css`
            background-image: url(${p.Backgroundsmall});
          `}
  }
  @media ${device.laptopL} {
    ${rtl`
      padding-left: 40px;
    `}
    ${(p) =>
      p.page === PAGE.SIGNUP
        ? css`
            background-image: url(${p.Backgroundsmall});
          `
        : css`
            background-image: url(${p.Backgroundsmall});
          `}
  }
  @media ${device.desktop} {
    ${rtl`
      padding-left: 40px;
    `}
    ${(p) =>
      p.page === PAGE.SIGNUP
        ? css`
            background-image: url(${p.Backgroundsmall});
          `
        : css`
            background-image: url(${p.Backgroundsmall});
          `}
  }
  @media ${device.LaptopM} {
    ${rtl`
      padding-left: 40px;
    `}
    ${(p) =>
      p.page === PAGE.SIGNUP
        ? css`
            background-image: url(${p.BackgroundMed});
          `
        : css`
            background-image: url(${p.BackgroundMed});
          `}
  }
  @media ${device.LaptopML} {
    ${rtl`
      padding-left: 40px;
    `}
    ${(p) =>
      p.page === PAGE.SIGNUP
        ? css`
            background-image: url(${p.BackgroundMed});
          `
        : css`
            background-image: url(${p.BackgroundMed});
          `}
  }
  @media ${device.desktopS} {
    ${rtl`
      padding-left: 40px;
    `}
    ${(p) =>
      p.page === PAGE.SIGNUP
        ? css`
            background-image: url(${p.BackgroundMed});
          `
        : css`
            background-image: url(${p.BackgroundMed});
          `}
  }
  @media ${device.desktopL} {
    ${rtl`
      padding-left: 132px;
    `}
    ${(p) =>
      p.page === PAGE.SIGNUP
        ? css`
            background-image: url(${p.BackgroundLarge});
          `
        : css`
            background-image: url(${p.BackgroundLarge});
          `}
  }
`;

export const SidePanelContainer = styled.div<{
  page: string;
  pageLoading: boolean;
}>`
  min-height: 384px;
  border-radius: 8px;
  padding: 20px 32px 16px 32px;

  ${(p) =>
    p.pageLoading
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : css`
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: start;
        `};
  ${(p) => p.page === PAGE.SIGNUP && `width: 520px;`}
  ${(p) =>
    p.page !== PAGE.SIGNUP &&
    `width: 384px;   @media ${device.laptop} {
    padding: 20px 32px 16px 32px;
    width: 384px;
  }
  @media ${device.laptopL} {
    padding: 20px 32px 16px 32px;
    width: 384px;
  }
  @media ${device.desktop} {
    padding: 20px 32px 16px 32px;
    width: 384px;
  }
  @media ${device.desktopL} {
    padding: 32px 48px 32px 48px;
    width: 440px;
  }`}

  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  gap: 4px;
`;

export const MaticsGifStyled = styled.img<{ pageLoading: boolean }>`
  height: 48px;
  object-fit: cover;
  margin-bottom: 12px;
  @media ${device.laptop} {
    margin-bottom: 12px;
  }
  @media ${device.laptopL} {
    margin-bottom: 12px;
  }
  @media ${device.desktop} {
    margin-bottom: 12px;
  }
  @media ${device.desktopL} {
    margin-bottom: 24px;
  }
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
        text-align: left;
    `}

  color: #050709;
`;

export const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
        text-align: left;
    `}
  color: #404d61;
`;

export const FieldsContainer = styled.div<{ paddingBottom: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 0 ${(p) => (p.paddingBottom ? 32 : 0)}px 0;

  @media ${device.laptop} {
    padding: 32px 0 ${(p) => (p.paddingBottom ? 32 : 0)}px 0;
  }
  @media ${device.laptopL} {
    padding: 32px 0 ${(p) => (p.paddingBottom ? 32 : 0)}px 0;
  }
  @media ${device.desktop} {
    padding: 32px 0 ${(p) => (p.paddingBottom ? 32 : 0)}px 0;
  }
  @media ${device.desktopL} {
    padding: 32px 0 ${(p) => (p.paddingBottom ? 48 : 0)}px 0;
  }

  width: 100%;
  /* @media ${device.laptop} {
    width: 320px;
  }
  @media ${device.laptopL} {
    width: 320px;
  }
  @media ${device.desktop} {
    width: 320px;
  }
  @media ${device.desktopL} {
    width: 344px;
  } */

  gap: 26px;
  position: relative;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
`;
export const SecondaryButton = styled.button`
  height: 40px;
  padding: 8px 24px;
  width: 320px;
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

  &:hover {
    border: solid 1px #5900d3;
    color: #5900d3;
  }
`;

export const Button = styled.div<{ disabled: boolean }>`
  width: 320px;
  height: 40px;
  padding: 8px 24px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  }
`;

export const OrDiv = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
      text-align: left;
    `}

  color: #404d61;
  &::before {
    content: "or";
  }
`;

export const NoAccountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  gap: 4px;
`;
export const NoAccountText = styled.div<{ text: string }>`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  ${rtl`
        text-align: left;
    `}
  color: #404d61;
  &::before {
    content: "${(p) => p.text}";
  }
`;

export const ForgotPasswordLink = styled.div`
  position: absolute;

  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  ${rtl`
        text-align: left;
        right: 0;
        float: right;
    `}
  color: #5900d3;
  transform: translateY(-1px);
  cursor: pointer;
  &::before {
    content: "Forgot password?";
  }
`;
export const SignUpLink = styled.div<{ text: string }>`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  ${rtl`
        text-align: left;
    `}
  cursor: pointer;
  color: #5900d3;
  &::before {
    content: "${(p) => p.text}";
  }
`;
export const CopyRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 40px;
  @media ${device.laptop} {
    padding-top: 40px;
  }
  @media ${device.laptopL} {
    padding-top: 40px;
  }
  @media ${device.desktop} {
    padding-top: 40px;
  }
  @media ${device.desktopL} {
    padding-top: 72px;
  }

  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
        text-align: left;
    `}
  color: #101010;
  &::before {
    content: "Matics © 2015-2022";
  }
  position: sticky;
  bottom: 0;
  left: 0;
`;

export const TwoFieldsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 24px;
`;

export const ErrorText = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
      text-align: left;
    `}
  bottom: 0;
  color: #c73431;
  margin: 12px 0;
`;
