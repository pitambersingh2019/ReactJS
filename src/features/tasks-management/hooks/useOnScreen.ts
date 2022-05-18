import { MutableRefObject, useEffect, useState } from "react";

export default function useOnScreen(
  ref: MutableRefObject<HTMLDivElement | null>
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting)
    );
    ref.current && observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { isVisible };
}
