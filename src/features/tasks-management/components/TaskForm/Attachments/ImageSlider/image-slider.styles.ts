import styled from "styled-components";

export const Wrapper = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: ${(props) => props.theme.colors.black};
  height: 80px;
  margin-bottom: 72px;
  width: 100vw;
  position: relative;
`;

export const FileName = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.white};
`;

export const CloseIcon = styled.img`
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 50px;
`;

export const ImageSliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div<{ isActive: boolean }>`
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transform: ${(props) => props.isActive && "scale(1.01)"};
  transition-duration: 1s;
`;

export const ImageView = styled.img`
  margin: 0 16px;
  max-height: 50vh;
`;

export const IconContainer = styled.div`
  cursor: pointer;
`;
