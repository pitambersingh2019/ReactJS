import React, { createContext, useCallback, useContext, useRef } from "react";

type ScrollIntoViewState = {
  scrollToRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
};

type ScrollIntoViewStateContextProviderProps = {
  children: React.ReactNode;
};

const ScrollIntoViewContext = createContext<ScrollIntoViewState | undefined>(
  undefined
);

const ScrollIntoViewContextProvider = ({
  children,
}: ScrollIntoViewStateContextProviderProps) => {
  const scrollToRef = useRef<HTMLDivElement | null>(null);

  const onScroll = useCallback(() => {
    const scrollTo = scrollToRef.current;
    if (scrollTo) {
      setTimeout(() => {
        scrollTo.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <ScrollIntoViewContext.Provider
      value={{
        scrollToRef,
        onScroll,
      }}
    >
      {children}
    </ScrollIntoViewContext.Provider>
  );
};

const useScrollIntoView = () => {
  const context = useContext(ScrollIntoViewContext);
  if (context === undefined) {
    throw new Error(
      "useScrollIntoView must be used within the ScrollIntoViewContextProvider"
    );
  }

  return context;
};

export { ScrollIntoViewContextProvider, useScrollIntoView };
