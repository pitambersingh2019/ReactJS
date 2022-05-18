import { useRef, useState } from "react";

export default function useScroll(offset = 0) {
  const prevScrollY = useRef(0);
  const [scrollDir, setScrollDir] = useState<"UP" | "DOWN">("DOWN");
  const [showBarOnScroll, setShowBarOnScroll] = useState(false);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    if (prevScrollY.current < currentScrollY && scrollDir === "UP") {
      if (showBarOnScroll) {
        setShowBarOnScroll(false);
      }
      setScrollDir("DOWN");
    }
    if (prevScrollY.current > currentScrollY && scrollDir === "DOWN") {
      if (!showBarOnScroll) {
        setShowBarOnScroll(true);
      }
      setScrollDir("UP");
    }
    if (scrollDir === "UP" && currentScrollY <= offset) {
      setShowBarOnScroll(false);
    }
    // const showBarOnScroll = scrollDir === "UP" && prevScrollY.current >= offset;
    prevScrollY.current = currentScrollY;
  };

  return { onScroll, showBarOnScroll };
}
