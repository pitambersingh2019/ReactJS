import React, { FC } from "react";
import * as Styled from "./styled";

interface IProps {
  width: number;
  height: number;
  backgroundColor: string;
}

const Mark: FC<IProps> = ({ width, height, backgroundColor }) => {
  return (
    <Styled.Wrapper
      width={width}
      height={height}
      backgroundColor={backgroundColor}
    />
  );
};

export default Mark;
