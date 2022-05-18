import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import throttle from "lodash.throttle";
import { convertRGBtoHSL } from "./utils";
import usePaintSquare from "./usePaintSquare";
import config from "./config";

const { squareSize, crossSize, delay, inputSize } = config;

export const SquareWrapper = styled.div`
  position: relative;
  width: ${squareSize + "px"};
  height: ${squareSize + "px"};
  overflow: hidden;
  border-radius: 8px;
`;

export const Canvas = styled.canvas.attrs(() => ({
  width: squareSize,
  height: squareSize,
}))``;

export const Cross = styled.div.attrs((p) => ({
  style: {
    top: p.top + "px",
    left: p.left + "px",
    width: crossSize + "px",
    height: crossSize + "px",
    transition: p.animate ? "top .2s ease-out, left .2s ease-out" : "0s",
  },
}))`
  /* position: fixed; */
  position: absolute;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Square = ({
  hue,
  squareXY,
  animate,
  setSquare,
  offsetTop,
  offsetLeft,
  setSquareXY,
  setAnimate,
  SquareRef,
}) => {
  const square = useRef(null);
  const canvas = useRef(null);

  usePaintSquare(canvas, hue);

  const computePosition = useCallback(
    (e) => {
      const x = Math.max(
        crossSize / -2,
        Math.min(e.pageX - offsetLeft + squareSize, squareSize - crossSize / 2)
      );
      const y = Math.max(
        crossSize / -2,
        Math.min(
          e.pageY - offsetTop + squareSize + inputSize,
          squareSize - crossSize / 2
        )
      );

      return [x, y];
    },
    [offsetLeft, offsetTop]
  );

  const changeColor = useCallback(
    (e) => {
      const canvasRef = canvas.current;
      const ctx = canvasRef.getContext("2d");
      const [x, y] = computePosition(e);
      const x1 = Math.min(x + crossSize / 2, squareSize - 1);
      const y1 = Math.min(y + crossSize / 2, squareSize - 1);
      const [r, g, b] = ctx.getImageData(x1, y1, 1, 1).data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [h, s, l] = convertRGBtoHSL([r, g, b]);
      setSquare([s, l]);
      setSquareXY([x, y]);
    },
    [computePosition, setSquare, setSquareXY]
  );

  useEffect(() => {
    const onMouseMove = throttle((e) => {
      changeColor(e);
    }, delay);

    function onMouseUp(e) {
      changeColor(e);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    }

    function onMouseDown() {
      setAnimate(false);
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp);
    }
    const canvasRef = canvas.current;
    canvasRef.addEventListener("mousedown", onMouseDown);

    return () => {
      canvasRef.removeEventListener("mousedown", onMouseDown);
    };
  }, [offsetTop, offsetLeft, setSquare, setSquareXY, setAnimate, changeColor]);
  //  <Svg name="cross" />
  return (
    <div ref={SquareRef}>
      <SquareWrapper ref={square}>
        <Cross top={squareXY[1]} left={squareXY[0]} animate={animate}>
          <span
            name="cross"
            style={{
              height: "32px",
              width: "32px",
              backgroundColor: "transparent",
              borderRadius: "50%",
              display: "inline-block",
              boxShadow: "0 3px 12px 0 #000000",
              border: "solid 2px #ffffff",
            }}
          ></span>
        </Cross>
        <Canvas ref={canvas} />
      </SquareWrapper>
    </div>
  );
};

export default Square;
