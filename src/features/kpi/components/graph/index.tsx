import React, { FC } from "react";
import { IDataDisplayComponent } from "..";
import HtmlTooltip from "../../../../Component/ToolTip/TooltipSelect";
import { Breakpoints, TSize } from "../gauge";
import * as Styled from "./style";

interface IProps {
  data: IDataDisplayComponent;
  persentFix: number;
}
export interface ISizeGraph {
  width: number;
  fontSize: number;
  gap: number;
  sideMargin?: number;
}

const storeSize = (size: TSize): ISizeGraph => {
  switch (size) {
    case "s": {
      return {
        width: 90,
        gap: 25,
        sideMargin: 5,
        fontSize: 12,
      };
    }
    case "m": {
      return {
        width: 150,
        gap: 40,
        fontSize: 14,
      };
    }
    case "l": {
      return {
        width: 200,
        gap: 50,
        fontSize: 14,
      };
    }
    default: {
      return {
        width: 250,
        gap: 55,
        fontSize: 16,
      };
    }
  }
};

const getProgress = (progress: number) => {
  if (progress > 1000 || progress < -1000) {
    return progress / 1000 + "K";
  }
  return progress;
};

const Graph: FC<IProps> = ({ data, persentFix }) => {
  const {
    size,
    progress,
    min,
    max,
    media,
    isPrimary,
    isPersent,
    isResultValid,
  } = data;
  const { sm, md, lg, xl } = media;

  let background = "";

  if (persentFix > 0.5) {
    background = "#74c069";
  } else if (persentFix > 0.25) {
    background = "#f3a724";
  } else {
    background = "#731521";
  }

  if (!isResultValid) {
    background = "#797e89";
    persentFix = 0;
  }

  const breakpoints: Breakpoints<ISizeGraph> = {
    sm: sm ? storeSize(sm) : undefined,
    md: md ? storeSize(md) : undefined,
    lg: lg ? storeSize(lg) : undefined,
    xl: xl ? storeSize(xl) : undefined,
  };
  const sizeParams = storeSize(size);

  return (
    <Styled.WrapperComponent isPrimary={isPrimary}>
      {isPersent && isResultValid && (
        <Styled.WrapperPercent
          gap={sizeParams.gap}
          sideMargin={sizeParams.sideMargin}
          breakpoint={breakpoints}
        >
          {getProgress(progress)}
        </Styled.WrapperPercent>
      )}

      <Styled.Wrapper
        dir="ltr"
        width={sizeParams.width}
        breakpoint={breakpoints}
      >
        <Styled.LineBackground
          width={sizeParams.width}
          height={sizeParams.width * 0.06}
          breakpoint={breakpoints}
          isResultValid={isResultValid}
        >
          <Styled.Line
            width={persentFix * sizeParams.width}
            height={sizeParams.width * 0.06}
            backgroundColor={background}
            breakpoint={breakpoints}
            widthColor={persentFix}
          />
          {isResultValid && (
            <Styled.VerticalLine
              height={sizeParams.width * 0.12}
              left={persentFix * sizeParams.width}
              breakpoint={breakpoints}
              widthColor={persentFix}
            />
          )}
        </Styled.LineBackground>
        <Styled.LineNumberWrapper>
          <Styled.LineNumber
            fontSize={sizeParams.fontSize}
            breakpoint={breakpoints}
            isResultValid={isResultValid}
            translateX={0}
          >
            <HtmlTooltip title={min.toString()}>
              <div>0%</div>
            </HtmlTooltip>
          </Styled.LineNumber>
          <Styled.LineNumber
            fontSize={sizeParams.fontSize}
            breakpoint={breakpoints}
            isResultValid={isResultValid}
            translateX={50}
          >
            <HtmlTooltip title={max.toString()}>
              <div>100%</div>
            </HtmlTooltip>
          </Styled.LineNumber>
        </Styled.LineNumberWrapper>
      </Styled.Wrapper>
    </Styled.WrapperComponent>
  );
};

export default Graph;
