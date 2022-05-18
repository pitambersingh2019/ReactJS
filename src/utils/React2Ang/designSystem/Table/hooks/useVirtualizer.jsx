/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo } from "react";
import { useVirtual, defaultRangeExtractor } from "react-virtual";

function cancelTimeout(handle) {
  cancelAnimationFrame(handle.id);
}

function requestTimeout(fn, delay) {
  const start = Date.now();

  function loop() {
    if (Date.now() - start >= delay) {
      fn.call(null);
    } else {
      handle.id = requestAnimationFrame(loop);
    }
  }

  const handle = {
    id: requestAnimationFrame(loop),
  };

  return handle;
}

const useKeepMountedRangeExtractor = () => {
  const renderedRef = React.useRef(new Set());

  const rangeExtractor = React.useCallback((range) => {
    renderedRef.current = new Set([
      ...renderedRef.current,
      ...defaultRangeExtractor(range),
    ]);
    return Array.from(renderedRef.current);
  }, []);

  return rangeExtractor;
};

const useScroller = (rows, visibleColumns, isRtl) => {
  // Initialize the state

  const parentRef = React.useRef();
  const scrollingRef = React.useRef();

  const isMountedRef = React.useRef(false);

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const [isScrolling, setIsScrolling] = React.useState(false);
  const scrollingIdRef = React.useRef(null);
  const debouncedResetScrollingRef = React.useRef(() => {
    if (scrollingIdRef.current !== null) {
      cancelTimeout(scrollingIdRef.current);
    }

    scrollingIdRef.current = requestTimeout(() => {
      scrollingIdRef.current = null;

      if (isMountedRef.current) {
        setIsScrolling(false);
      }
    }, 400);
  });

  const scrollOffsetFn = React.useCallback(
    (event) => {
      if (event) {
        setIsScrolling(true);
        debouncedResetScrollingRef.current();
      }
      return parentRef.current ? parentRef.current["scrollTop"] : 0;
    },
    [parentRef]
  );

  const virtualListStyles = useMemo(
    () => ({ position: "absolute", top: 0, left: 0 }),
    []
  );
  function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }

  const smoothScrollFn = React.useCallback((offset, defaultScrollTo) => {
    const duration = 1000;
    const start = parentRef.current.scrollTop;
    const startTime = (scrollingRef.current = Date.now());

    const run = () => {
      if (scrollingRef.current !== startTime) return;
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = easeInOutQuint(Math.min(elapsed / duration, 1));
      const interpolated = start + (offset - start) * progress;

      if (elapsed < duration) {
        defaultScrollTo(interpolated);
        requestAnimationFrame(run);
      } else {
        defaultScrollTo(interpolated);
      }
    };

    requestAnimationFrame(run);
  }, []);

  // const defaultRangeExtractor = useCallback((range) => {
  //   const start = Math.max(range.start - range.overscan, 0);
  //   const exclusiveEnd = Math.min(range.end + range.overscan + 1, range.size);
  //   const length = exclusiveEnd - start;
  //   const indices = Array.from({ length });
  //   for (let i = 0; i < length; i++) {
  //     indices[i] = start + i;
  //   }
  //   return indices;
  // }, []);

  // const defaultRangeExtractor = useCallback((range) => {
  //   const start = 0;
  //   const exclusiveEnd = Math.min(range.end + range.overscan + 1, range.size);
  //   const length = exclusiveEnd - start;
  //   const indices = Array.from({ length });
  //   for (let i = 0; i < length; i++) {
  //     indices[i] = start + i;
  //   }
  //   return indices;
  // }, []);

  const rowVirtualizer = useVirtual({
    size: rows.length + 1,
    parentRef,
    estimateSize: React.useCallback(() => 50, []),
    overscan: 1,
    // scrollToFn: smoothScrollFn,
    // scrollOffsetFn: scrollOffsetFn,
    // rangeExtractor: useKeepMountedRangeExtractor(),
    paddingStart: 80,
  });

  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: visibleColumns.length,
    parentRef,
    estimateSize: React.useCallback(
      (i) => visibleColumns[i].width,
      [visibleColumns]
    ),
    overscan: isRtl ? 100 : 1,
  });
  const scrollToIndex = React.useCallback(
    (index) => {
      rowVirtualizer.scrollToIndex(index);
    },
    [rowVirtualizer]
  );
  const scrollToLastTable = React.useCallback(
    (index) => {
      rowVirtualizer.scrollToIndex(rows.length + 1, { align: "center" });
    },
    [rowVirtualizer, rows.length]
  );

  const scrollToOffset = React.useCallback(
    (offset) => {
      rowVirtualizer.scrollToOffset(offset);
    },
    [rowVirtualizer]
  );

  return [
    rowVirtualizer,
    columnVirtualizer,
    parentRef,
    virtualListStyles,
    scrollToLastTable,
    isScrolling,
  ];
};

export default useScroller;
