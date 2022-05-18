import { useRef, useState } from "react";

export default function useScroll() {
  const cellRef = useRef();
  const [cellPos, setCellPos] = useState(undefined);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    const curCellPos = cellRef.current?.getBoundingClientRect().x;
    if (!cellPos) {
      setCellPos(curCellPos);
    }
    if (cellPos && cellPos > curCellPos) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  return { handleScroll, isScrolling, cellRef };
}
