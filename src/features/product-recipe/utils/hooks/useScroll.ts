import { useRef, useState } from "react";

export default function useScroll(offset = 0) {
  const prevScrollY = useRef(0);
  const [scrollDir, setScrollDir] = useState<"UP" | "DOWN">("DOWN");
  const [showBarOnScroll, setShowBarOnScroll] = useState(true);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    if (currentScrollY === 0) {
      setShowBarOnScroll(true);
    }
    if (scrollDir === "DOWN" && prevScrollY.current < currentScrollY) {
      setShowBarOnScroll(false);
    }
    if (scrollDir === "DOWN" && prevScrollY.current > currentScrollY) {
      setShowBarOnScroll(true);
      setScrollDir("UP");
    }
    if (scrollDir === "UP" && prevScrollY.current < currentScrollY) {
      setShowBarOnScroll(false);
      setScrollDir("DOWN");
    }
    // if (prevScrollY.current < currentScrollY && scrollDir === "UP") {
    //   if (showBarOnScroll) {
    //     setShowBarOnScroll(false);
    //   }
    //   setScrollDir("DOWN");
    // }
    // if (prevScrollY.current > currentScrollY && scrollDir === "DOWN") {
    //   if (!showBarOnScroll) {
    //     setShowBarOnScroll(true);
    //   }
    //   setScrollDir("UP");
    // }
    if (scrollDir === "UP" && currentScrollY <= offset) {
      setShowBarOnScroll(true);
    }
    // const showBarOnScroll = scrollDir === "UP" && prevScrollY.current >= offset;
    prevScrollY.current = currentScrollY;
  };

  return { onScroll, showBarOnScroll };
}
