import { ReactNode } from "react";
import {
  ChartsContainer,
  LargeContainer,
  SmallContainer,
} from "./charts-wrapper.styles";

type ChartsWrapperProps = {
  largeChart?: ReactNode;
  smallChart?: ReactNode;
};

export default function ChartsWrapper({
  largeChart,
  smallChart,
}: ChartsWrapperProps) {
  return (
    <ChartsContainer>
      <LargeContainer>{largeChart}</LargeContainer>
      <SmallContainer>{smallChart}</SmallContainer>
    </ChartsContainer>
  );
}
