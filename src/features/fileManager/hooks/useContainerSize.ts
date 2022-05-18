import { RefObject, useCallback, useEffect, useState } from "react";

export function useContainerSize(myRef: RefObject<HTMLDivElement>) {
  const getDimensions = useCallback(
    () => ({
      width: myRef.current?.offsetWidth || 0,
      height: myRef.current?.offsetHeight || 0,
    }),
    [myRef]
  );

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getDimensions, myRef]);

  return dimensions;
}
