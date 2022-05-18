import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Arowdropdown from "../../../assets/icons/Arowdropdown.svg";
import { device } from "../../../utils/devices";
// @ts-ignore
import rtl from "styled-components-rtl";

interface IProps {
  open?: boolean;
  header: string | React.ReactNode;
  onClickHeader: () => void;
}

const ContainerCollapseBox = styled.div<{ isOpen: boolean }>`
  width: 100%;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  border: ${(p) => (p.isOpen ? "solid 1px #d1d1d1" : "solid 1px #d1d1d1")};
`;

const TitleWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  ${rtl`
    justify-content: start;
  `}
  align-items: center;
  padding: 14px;
  cursor: pointer;
  gap: 5px;
  background-color: #f0edfe;
  border-radius: ${(props) =>
    props.isOpen ? "8px 8px 0px 0px" : "8px 8px 8px 8px"};
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  user-select: none;
`;

const ContentCollapseBox = styled.div<{
  height: number | undefined;
  isOpen: boolean;
}>`
  overflow: ${(props) => (props.isOpen ? "unset" : "hidden")};
  display: ${(props) => (props.isOpen ? "block" : "none")};
  border-bottom: 1px solid #dee2e6 !important;
  background-color: #ffffff;
  border-radius: 0px 0px 8px 8px;
`;

const ChildrenCollapseBox = styled.div`
  @media ${device.laptop} {
    padding: 24px; //gap 40
  }
  @media ${device.laptopL} {
    padding: 24px; //gap 48
  }
  @media ${device.desktop} {
    padding: 16px; //24  gap
  }
  @media ${device.LaptopM} {
    padding: 24px; //48
  }
  @media ${device.LaptopML} {
    padding: 24px; //48
  }
  @media ${device.desktopS} {
    padding: 24px; //48
  }
  @media ${device.desktopL} {
    padding: 24px; //48
  }
`;

const IconArrowClosed = styled.img`
  width: 12px;
  height: 12px;
  transform: rotate(-90deg);
`;

const IconArrowOpened = styled.img`
  width: 12px;
  height: 12px;
`;
const ChildernWrapper = styled.div``;

const Collapsible: React.FC<IProps> = ({
  open,
  children,
  header,
  onClickHeader,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open ?? false);
  const [height, setHeight] = useState<number | undefined>(
    open ? undefined : 0
  );

  useEffect(() => {
    setIsOpen(open ?? false);
  }, [open]);
  const ref = useRef<HTMLDivElement>(null);
  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
    if (onClickHeader) {
      onClickHeader();
    }
  };
  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined;
    // @ts-ignore
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);

  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);

  return (
    <>
      <ContainerCollapseBox isOpen={isOpen}>
        <TitleWrapper onClick={handleFilterOpening} isOpen={isOpen}>
          {isOpen ? (
            <IconArrowOpened src={Arowdropdown} />
          ) : (
            <IconArrowClosed src={Arowdropdown} />
          )}
          <Title>{header}</Title>
        </TitleWrapper>
        <ContentCollapseBox height={height} isOpen={isOpen}>
          <ChildernWrapper ref={ref}>
            <ChildrenCollapseBox>{children}</ChildrenCollapseBox>
          </ChildernWrapper>
        </ContentCollapseBox>
      </ContainerCollapseBox>
    </>
  );
};

export default Collapsible;
