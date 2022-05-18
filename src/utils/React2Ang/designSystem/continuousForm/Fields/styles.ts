import styled from "styled-components";
import { device } from "../../../../devices";
export const InputWrapper = styled.div`
  //default:
  display: flex;
  justify-content: start;
  align-items: center;
  @media ${device.laptop} {
    flex: 0 1 calc(50% - 40px);
  }
  @media ${device.laptopL} {
    flex: 0 1 calc(50% - 48px);
  }
  @media ${device.desktop} {
    flex: 0 1 calc(33.3333333% - 24px);
  }
  @media ${device.LaptopM} {
    flex: 0 1 calc(33.3333333% - 40px);
  }
  @media ${device.LaptopML} {
    flex: 0 1 calc(33.3333333% - 40px);
  }
  @media ${device.desktopS} {
    flex: 0 1 calc(25% - 50px);
  }
  @media ${device.desktopL} {
    flex: 0 1 calc(25% - 50px);
  }
`;
