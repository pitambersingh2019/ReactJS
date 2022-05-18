import styled from "styled-components";

export const Header = styled.div`
  display: flex;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.89;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const CloseIcon = styled.img`
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  ${(props) => (props.theme.dir === "rtl" ? "left: 16px;" : "right: 16px;")}
`;

export const Divider = styled.div`
  margin: 12px 0;
  width: 100%;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.lightGray4}`};
`;

export const Wrapper = styled.div`
  margin-bottom: 64px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-top: 8px;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 16px;

  & > * {
    &:first-child {
      margin-inline-end: 24px;
    }
  }
`;
