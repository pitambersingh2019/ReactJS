import React, { FC } from "react";
import * as Styled from "./style";
import arrow from "./../../assets/img/Gauge_Pointer.svg";
import { getDisplayComponent, IDataDisplayComponent } from "..";
import HtmlTooltip from "../../../../Component/ToolTip/TooltipSelect";

export type TSize = "s" | "m" | "l" | "xl";

interface IProps {
  data: IDataDisplayComponent;
  borderStyle: 0 | 1 | 2;
  persentFix: number;
  bgColorInside?: string;
}

export interface ISizeGuage {
  width: number;
  borderWidth: number;
  fontSize: number;
}

export interface Breakpoints<T> {
  sm?: T; //640
  md?: T; //1024
  lg?: T; //1200
  xl?: T; //1400
}

const borderColor = [
  "#797e89",
  "linear-gradient(to right,#DCEDFF,#00468C)",
  "conic-gradient(#6ec563 0deg 180deg,#850f16 180deg 315deg,#f5a628 315deg)",
];

const storeSize = (size: TSize): ISizeGuage => {
  switch (size) {
    case "s": {
      return {
        width: 70,
        borderWidth: 16,
        fontSize: 12,
      };
    }
    case "m": {
      return {
        width: 106,
        borderWidth: 20,
        fontSize: 14,
      };
    }
    case "l": {
      return {
        width: 160,
        borderWidth: 27,
        fontSize: 14,
      };
    }
    default: {
      return {
        width: 180,
        borderWidth: 33,
        fontSize: 16,
      };
    }
  }
};

const getColorPersent = (progress: number, mode: number) => {
  if (mode !== 2) return "#101010";
  if (progress <= 25) return "#850f16";
  if (progress <= 50) return "#f5a628";
  return "#6ec563";
};

const Gauge: FC<IProps> = ({
  data,
  borderStyle,
  bgColorInside,
  persentFix,
}) => {
  const { size, media, min, max, isPrimary, isPersent, isResultValid } = data;
  const { sm, md, lg, xl } = media;

  if (!isResultValid) {
    borderStyle = 0;
  }

  const breakpoints: Breakpoints<ISizeGuage> = {
    sm: sm ? storeSize(sm) : undefined,
    md: md ? storeSize(md) : undefined,
    lg: lg ? storeSize(lg) : undefined,
    xl: xl ? storeSize(xl) : undefined,
  };
  const sizeParams = storeSize(size);
  const position = size === "s" ? "bottom-left" : "right";

  const getBottomNumber = () => {
    return (
      <Styled.CircleNumberWrapper dir="ltr">
        <Styled.CircleNumber
          fontSize={sizeParams.fontSize}
          type="min"
          breakpoint={breakpoints}
          isResultValid={isResultValid}
        >
          <HtmlTooltip title={min.toString()}>
            <div>0%</div>
          </HtmlTooltip>
        </Styled.CircleNumber>
        <Styled.ArrowWrapper
          width={sizeParams.width * 0.3}
          height={sizeParams.width * 0.15}
          progress={persentFix}
          breakpoint={breakpoints}
        >
          <Styled.Arrow src={arrow} draggable={false} />
        </Styled.ArrowWrapper>
        <Styled.CircleNumber
          fontSize={sizeParams.fontSize}
          type="max"
          breakpoint={breakpoints}
          isResultValid={isResultValid}
        >
          <HtmlTooltip title={max.toString()}>
            <div>100%</div>
          </HtmlTooltip>
        </Styled.CircleNumber>
      </Styled.CircleNumberWrapper>
    );
  };
  const getCircle = () => {
    return (
      <Styled.CircleWrapper
        height={sizeParams.width / 2}
        breakpoint={breakpoints}
      >
        <Styled.Circle
          height={sizeParams.width}
          color={borderColor[borderStyle]}
          breakpoint={breakpoints}
        >
          <Styled.WhiteCircle
            width={sizeParams.width - sizeParams.borderWidth}
            height={sizeParams.width - sizeParams.borderWidth}
            backgrondColor={bgColorInside}
            breakpoint={breakpoints}
          />
        </Styled.Circle>
      </Styled.CircleWrapper>
    );
  };
  return (
    <Styled.Wrapper isPrimary={isPrimary}>
      <Styled.WrapperComponent
        width={sizeParams.width}
        breakpoint={breakpoints}
        isPersent={isPersent}
      >
        {getCircle()}
        {getBottomNumber()}
      </Styled.WrapperComponent>
      {isPersent && isResultValid && (
        <Styled.ValueWrapper>
          {getDisplayComponent.getValuePercent(
            data,
            position,
            getColorPersent(persentFix, borderStyle)
          )}
        </Styled.ValueWrapper>
      )}
    </Styled.Wrapper>
  );
};

export default Gauge;
