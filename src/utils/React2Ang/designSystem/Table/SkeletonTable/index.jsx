/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useMemo } from "react";
import {
  SSkeletonLine,
  Container,
  HeaderWrapper,
  SkeletonColWrapper,
} from "./styles";
const SkeletonCol = ({ width, height, indexofCol }) => {
  const rowsNum = Math.floor((height - 80) / (16 + 24));
  return (
    <SkeletonColWrapper
      width={width}
      height={height}
      justifyElemnts={!indexofCol}
    >
      <SSkeletonLine width={width} height={40} />
      {Array.from(
        Array.from(Array(rowsNum >= 0 ? rowsNum : 2).keys()).map((index) => (
          <SSkeletonLine
            key={index}
            width={indexofCol ? Math.random() * (width - 40) + 40 : 16}
            height={16}
          />
        ))
      )}
    </SkeletonColWrapper>
  );
};
const SkeletonTable = ({ tableHeight, tableWidth }) => {
  const [colSizes, setcolSizes] = useState([]);
  useEffect(() => {
    const n = tableWidth - 80;
    const x = 5;
    const minColWidth = 150;
    const fragment = n / x;
    const fragments = [];
    for (let i = 0; i < x; i++) {
      fragments[i] = fragment;
    }
    const delta = [];

    for (let i = 1; i < x; i++) {
      delta[i] = Math.floor(Math.random() * (fragment - minColWidth));
      if (i % 2 == 1) {
        fragments[i] -= delta[i];
      } else {
        fragments[i] += delta[i];
      }
    }
    fragments[0] = 0;

    // defines a function we can use to total the array values
    function getSum(total, num) {
      return total + num;
    }

    const partialTotal = fragments.reduce(getSum);
    fragments[0] = n - partialTotal;
    setcolSizes([50, ...fragments]);
  }, [tableWidth]);

  return (
    <Container>
      <HeaderWrapper>
        {colSizes.map((width, index) => (
          <SkeletonCol
            width={width}
            height={tableHeight}
            indexofCol={index}
            key={index}
          />
        ))}
      </HeaderWrapper>
    </Container>
  );
};
export default SkeletonTable;
