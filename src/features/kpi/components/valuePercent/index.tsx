import { FC } from "react";
import { IDataDisplayComponent } from "..";
import HtmlTooltip from "../../../../Component/ToolTip/TooltipSelect";
import { Breakpoints } from "../gauge";
import * as Styled from "./style";

export type TSize = "s" | "m" | "l" | "xl";
export type TPostionText = "center" | "bottom-left" | "right";
interface IProps {
  data: IDataDisplayComponent;
  positionText: TPostionText;
  color?: string;
}

export interface ISizeValuePersent {
  width: number;
  fontSize: number;
}

const storeSize = (size: TSize): ISizeValuePersent => {
  switch (size) {
    case "s": {
      return {
        width: 140,
        fontSize: 16,
      };
    }
    case "m": {
      return {
        width: 160,
        fontSize: 16,
      };
    }
    case "l": {
      return {
        width: 200,
        fontSize: 20,
      };
    }
    default: {
      return {
        width: 200,
        fontSize: 26.7,
      };
    }
  }
};

const getLongStatus = (progress: number, max: number) => {
  if (progress < 0) {
    progress *= -1;
  }
  if (max < 0) {
    max *= -1;
  }
  return progress.toString().length > 5 || max.toString().length > 7;
};

const ValuePercent: FC<IProps> = ({ data, positionText, color }) => {
  const { size, max, progress, media, isResultValid } = data;
  const { sm, md, lg, xl } = media;

  const breakpoints: Breakpoints<ISizeValuePersent> = {
    sm: sm ? storeSize(sm) : undefined,
    md: md ? storeSize(md) : undefined,
    lg: lg ? storeSize(lg) : undefined,
    xl: xl ? storeSize(xl) : undefined,
  };

  const sizeParams = storeSize(size);
  const isLongValue = isResultValid && getLongStatus(progress, max);

  const getBody = () => {
    if (isLongValue) {
      return (
        <HtmlTooltip title={progress + " / " + max}>
          <span>{progress}</span>
        </HtmlTooltip>
      );
    }
    return (
      <>
        <span>{isResultValid ? progress : "XX"}</span>
        <span>&#160;/ {isResultValid ? max : "XX"}</span>
      </>
    );
  };

  return (
    <Styled.Wrapper width={sizeParams.width} breakpoint={breakpoints}>
      <Styled.PersentWrapper positionText={positionText}>
        <Styled.Percent
          fontSize={sizeParams.fontSize}
          breakpoint={breakpoints}
          isLong={isLongValue}
          positionText={positionText}
          isResultValid={isResultValid}
          colorText={isResultValid ? color : "#797e89"}
        >
          {getBody()}
        </Styled.Percent>
      </Styled.PersentWrapper>
    </Styled.Wrapper>
  );
};

export default ValuePercent;
